"use client";

import { useContext, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RotateCcw, Copy } from "lucide-react";
import {
    Badge,
    Link,
    PaginatedTable,
    Tooltip,
    useToast,
} from "@courselit/components-library";
import {
    BUTTON_CANCEL_TEXT,
    COMMUNITY_MEMBERSHIP_CHANGE_ROLE,
    COMMUNITY_MEMBERSHIP_CHANGE_STATUS,
    COMMUNITY_MEMBERSHIP_COL_JOINING_REASON,
    COMMUNITY_MEMBERSHIP_COL_REJECTION_REASON,
    COMMUNITY_MEMBERSHIP_COL_ROLE,
    COMMUNITY_MEMBERSHIP_COL_STATUS,
    COMMUNITY_MEMBERSHIP_COL_SUBSCRIPTION,
    COMMUNITY_MEMBERSHIP_COL_USER,
    COMMUNITY_MEMBERSHIP_COPIED_DESCRIPTION,
    COMMUNITY_MEMBERSHIP_COPIED_TITLE,
    COMMUNITY_MEMBERSHIP_COPY_SUBSCRIPTION,
    COMMUNITY_MEMBERSHIP_FILTER_ALL,
    COMMUNITY_MEMBERSHIP_FILTER_STATUS,
    COMMUNITY_MEMBERSHIP_LIST_HEADER,
    COMMUNITY_MEMBERSHIP_LIST_SUBHEADER,
    COMMUNITY_MEMBERSHIP_REJECT_CONFIRM,
    COMMUNITY_MEMBERSHIP_REJECT_DESCRIPTION,
    COMMUNITY_MEMBERSHIP_REJECT_TITLE,
    COMMUNITY_MEMBERSHIP_SUBSCRIPTION_ID,
    COMMUNITY_STATUS_ACTIVE,
    COMMUNITY_STATUS_PENDING,
    COMMUNITY_STATUS_REJECTED,
    COURSE_DISCUSSIONS_ADMIN_REASON,
    TOAST_TITLE_ERROR,
} from "@ui-config/strings";
import { AddressContext, ProfileContext } from "@components/contexts";
import { capitalize, FetchBuilder } from "@courselit/utils";
import {
    CommunityMemberStatus,
    Constants,
    Membership,
    User,
} from "@courselit/common-models";
import { getNextStatusForCommunityMember, truncate } from "@ui-lib/utils";
import { useRouter } from "next/navigation";

interface MembershipRequest {
    id: string;
    name: string;
    email: string;
    avatar: string;
    reason: string;
    status: "pending" | "approved" | "rejected";
    rejectionReason?: string;
}

const itemsPerPage = 10;

type Member = Pick<
    Membership,
    | "entityId"
    | "status"
    | "rejectionReason"
    | "joiningReason"
    | "subscriptionMethod"
    | "subscriptionId"
    | "role"
> & {
    user: Pick<User, "email" | "name" | "userId" | "avatar">;
};

export function MembershipList({ id }: { id: string }) {
    const [requests, setRequests] = useState<MembershipRequest[]>([]);
    const [filter, setFilter] = useState<"all" | CommunityMemberStatus>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRequest, setSelectedMember] = useState<Member | null>(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalMembers, setTotalMembers] = useState(0);
    const [members, setMembers] = useState<Member[]>([]);
    const address = useContext(AddressContext);
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = useState(false);
    const { profile } = useContext(ProfileContext);
    const router = useRouter();

    const fetch = new FetchBuilder()
        .setUrl(`${address.backend}/api/graph`)
        .setIsGraphQLEndpoint(true);

    useEffect(() => {
        loadMembers();
    }, [page]);

    useEffect(() => {
        setPage(1);
        setTotalMembers(0);
        loadMembers();
    }, [filter]);

    const loadMembers = async () => {
        const query = `
            query ($communityId: String!, $page: Int, $limit: Int, $status: MembershipStatusType) {
                members: getMembers(communityId: $communityId, page: $page, limit: $limit, status: $status) {
                    user {
                        userId
                        name
                        email
                        avatar {
                            mediaId
                            thumbnail
                        }
                    }
                    status
                    rejectionReason
                    joiningReason
                    subscriptionMethod
                    subscriptionId
                    role
                },
                totalMembers: getMembersCount(communityId: $communityId, status: $status) 
            }`;
        try {
            const fetchRequest = fetch
                .setPayload({
                    query,
                    variables: {
                        communityId: id,
                        page,
                        limit: itemsPerPage,
                        status:
                            filter === "all" ? undefined : filter.toUpperCase(),
                    },
                })
                .build();
            const response = await fetchRequest.exec();
            if (response.members) {
                setMembers(response.members);
                setTotalMembers(response.totalMembers);
            }
        } catch (e) {
            if (e.message === "Item not found") {
                router.replace(`/dashboard/community/${id}`);
            } else {
                toast({
                    title: TOAST_TITLE_ERROR,
                    description: e.message,
                    variant: "destructive",
                });
            }
        }
    };

    const updateMemberStatus = async (userId: string) => {
        setIsUpdating(true);
        const query = `
            mutation ($communityId: String!, $userId: String!, $rejectionReason: String) {
                member: updateMemberStatus(communityId: $communityId, userId: $userId, rejectionReason: $rejectionReason) {
                    user {
                        userId
                        name
                        email
                        avatar {
                            mediaId
                            thumbnail
                        }
                    }
                    status
                    rejectionReason
                    joiningReason
                    role
                }
            }`;
        try {
            const fetchRequest = fetch
                .setPayload({
                    query,
                    variables: {
                        communityId: id,
                        userId,
                        rejectionReason,
                    },
                })
                .build();
            const response = await fetchRequest.exec();
            if (response.member) {
                // replace the member in members
                setMembers((members: Member[]) =>
                    members.map((member) =>
                        member.user.userId === userId
                            ? response.member
                            : member,
                    ),
                );
            }
        } catch (e) {
            toast({
                title: TOAST_TITLE_ERROR,
                description: e.message,
                variant: "destructive",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const updateMemberRole = async (userId: string) => {
        setIsUpdating(true);
        const query = `
            mutation ($communityId: String!, $userId: String!) {
                member: updateMemberRole(communityId: $communityId, userId: $userId) {
                    user {
                        userId
                        name
                        email
                        avatar {
                            mediaId
                            thumbnail
                        }
                    }
                    status
                    rejectionReason
                    joiningReason
                    role
                }
            }`;
        try {
            const fetchRequest = fetch
                .setPayload({
                    query,
                    variables: {
                        communityId: id,
                        userId,
                    },
                })
                .build();
            const response = await fetchRequest.exec();
            if (response.member) {
                setMembers((members: Member[]) =>
                    members.map((member) =>
                        member.user.userId === userId
                            ? response.member
                            : member,
                    ),
                );
            }
        } catch (e) {
            toast({
                title: TOAST_TITLE_ERROR,
                description: e.message,
                variant: "destructive",
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRoleChange = (member: Member) => {
        setSelectedMember(member);
        updateMemberRole(member.user.userId);
    };

    const handleStatusChange = (member: Member) => {
        const nextStatus = getNextStatusForCommunityMember(
            member.status.toLowerCase() as CommunityMemberStatus,
        );
        setSelectedMember(member);
        if (nextStatus === Constants.MembershipStatus.REJECTED) {
            setIsDialogOpen(true);
        } else {
            updateMemberStatus(member.user.userId);
        }
    };

    const handleDialogConfirm = async () => {
        if (selectedRequest && rejectionReason) {
            await updateMemberStatus(selectedRequest.user.userId);
            setIsDialogOpen(false);
            setSelectedMember(null);
            setRejectionReason("");
        }
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: COMMUNITY_MEMBERSHIP_COPIED_TITLE,
            description: COMMUNITY_MEMBERSHIP_COPIED_DESCRIPTION,
        });
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">
                    {COMMUNITY_MEMBERSHIP_LIST_HEADER}
                </h2>
                <p className="text-muted-foreground">
                    {COMMUNITY_MEMBERSHIP_LIST_SUBHEADER}
                </p>
            </div>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Select
                        value={filter}
                        onValueChange={(value: any) => setFilter(value)}
                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue
                                placeholder={COMMUNITY_MEMBERSHIP_FILTER_STATUS}
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                {COMMUNITY_MEMBERSHIP_FILTER_ALL}
                            </SelectItem>
                            {[
                                Constants.MembershipStatus.PENDING,
                                Constants.MembershipStatus.ACTIVE,
                                Constants.MembershipStatus.REJECTED,
                            ].map((status) => (
                                <SelectItem value={status} key={status}>
                                    {status ===
                                    Constants.MembershipStatus.PENDING
                                        ? COMMUNITY_STATUS_PENDING
                                        : status ===
                                            Constants.MembershipStatus.ACTIVE
                                          ? COMMUNITY_STATUS_ACTIVE
                                          : COMMUNITY_STATUS_REJECTED}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="overflow-x-auto">
                    <PaginatedTable
                        page={page}
                        totalPages={Math.ceil(totalMembers / itemsPerPage)}
                        onPageChange={setPage}
                    >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">
                                        {COMMUNITY_MEMBERSHIP_COL_USER}
                                    </TableHead>
                                    <TableHead>
                                        {COMMUNITY_MEMBERSHIP_COL_STATUS}
                                    </TableHead>
                                    <TableHead>
                                        {COMMUNITY_MEMBERSHIP_COL_ROLE}
                                    </TableHead>
                                    <TableHead className="hidden lg:table-cell">
                                        {
                                            COMMUNITY_MEMBERSHIP_COL_JOINING_REASON
                                        }
                                    </TableHead>
                                    <TableHead className="hidden xl:table-cell">
                                        {
                                            COMMUNITY_MEMBERSHIP_COL_REJECTION_REASON
                                        }
                                    </TableHead>
                                    <TableHead>
                                        {COMMUNITY_MEMBERSHIP_COL_SUBSCRIPTION}
                                    </TableHead>
                                    {/* <TableHead>Subscription Method</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.user.email}>
                                        <TableCell className="font-medium">
                                            <Link
                                                href={`/dashboard/users/${member.user.userId}`}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={
                                                                member.user
                                                                    .avatar
                                                                    ?.thumbnail ||
                                                                "/courselit_backdrop_square.webp"
                                                            }
                                                            alt={
                                                                member.user
                                                                    .name ||
                                                                member.user
                                                                    .email
                                                            }
                                                        />
                                                        <AvatarFallback>
                                                            {(
                                                                member.user
                                                                    .name ||
                                                                member.user
                                                                    .email
                                                            ).charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">
                                                            {member.user.name ||
                                                                member.user
                                                                    .email}
                                                        </span>
                                                        {member.user.name && (
                                                            <span className="text-sm text-muted-foreground">
                                                                {
                                                                    member.user
                                                                        .email
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </TableCell>
                                        {/* <TableCell className="hidden xl:table-cell max-w-xs truncate">
                                            {capitalize(
                                                member.subscriptionMethod,
                                            ) || "-"}
                                        </TableCell> */}
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Badge
                                                    variant={
                                                        member.status.toLowerCase() ===
                                                        "pending"
                                                            ? "secondary"
                                                            : member.status.toLowerCase() ===
                                                                "active"
                                                              ? "default"
                                                              : "destructive"
                                                    }
                                                >
                                                    {member.status.toLowerCase() ===
                                                    "pending"
                                                        ? COMMUNITY_STATUS_PENDING
                                                        : member.status.toLowerCase() ===
                                                            "active"
                                                          ? COMMUNITY_STATUS_ACTIVE
                                                          : COMMUNITY_STATUS_REJECTED}
                                                </Badge>
                                                {member.user.userId !==
                                                    profile?.userId && (
                                                    <Tooltip
                                                        title={
                                                            COMMUNITY_MEMBERSHIP_CHANGE_STATUS
                                                        }
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    member,
                                                                )
                                                            }
                                                            disabled={
                                                                isUpdating
                                                            }
                                                        >
                                                            <RotateCcw className="h-3 w-3" />{" "}
                                                        </Button>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Badge>
                                                    {capitalize(member.role)}
                                                </Badge>
                                                {member.user.userId !==
                                                    profile?.userId && (
                                                    <Tooltip
                                                        title={
                                                            COMMUNITY_MEMBERSHIP_CHANGE_ROLE
                                                        }
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                handleRoleChange(
                                                                    member,
                                                                )
                                                            }
                                                            disabled={
                                                                isUpdating
                                                            }
                                                        >
                                                            <RotateCcw className="h-3 w-3" />
                                                        </Button>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell max-w-xs truncate">
                                            {member.joiningReason || "-"}
                                        </TableCell>
                                        <TableCell className="hidden xl:table-cell max-w-xs truncate">
                                            {member.rejectionReason || "-"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Tooltip
                                                    title={`${COMMUNITY_MEMBERSHIP_SUBSCRIPTION_ID}: ${member.subscriptionId}`}
                                                >
                                                    {member.subscriptionId
                                                        ? truncate(
                                                              member.subscriptionId,
                                                              10,
                                                          )
                                                        : "-"}
                                                </Tooltip>
                                                {member.subscriptionId && (
                                                    <Tooltip
                                                        title={
                                                            COMMUNITY_MEMBERSHIP_COPY_SUBSCRIPTION
                                                        }
                                                    >
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                handleCopyToClipboard(
                                                                    member.subscriptionId!,
                                                                )
                                                            }
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                    </Tooltip>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </PaginatedTable>
                </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {COMMUNITY_MEMBERSHIP_REJECT_TITLE}
                        </DialogTitle>
                        <DialogDescription>
                            {COMMUNITY_MEMBERSHIP_REJECT_DESCRIPTION}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-4">
                            <Label htmlFor="rejection-reason">
                                {COURSE_DISCUSSIONS_ADMIN_REASON}
                            </Label>
                            <Textarea
                                id="rejection-reason"
                                value={rejectionReason}
                                onChange={(e) =>
                                    setRejectionReason(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            {BUTTON_CANCEL_TEXT}
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleDialogConfirm}
                            disabled={!rejectionReason}
                        >
                            {COMMUNITY_MEMBERSHIP_REJECT_CONFIRM}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
