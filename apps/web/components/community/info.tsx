import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Constants,
    Membership,
    TextEditorContent,
} from "@courselit/common-models";
import { useContext, useState } from "react";
import {
    hasCommunityPermission,
    getCommunityMembersLabel,
} from "@ui-lib/utils";
import { Link, useToast } from "@courselit/components-library";
import { TextRenderer } from "@courselit/page-blocks";
import { AddressContext, ThemeContext } from "@components/contexts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@components/ui/dialog";
import {
    COMMUNITY_SETTINGS,
    TOAST_TITLE_SUCCESS,
    COMMUNITY_LEAVE,
    BUTTON_CANCEL_TEXT,
    COMMUNITY_LEAVE_CONFIRM_DESCRIPTION,
    COMMUNITY_LEAVE_CONFIRM_DESCRIPTION_DETAILS,
    COMMUNITY_MEMBERSHIP_PENDING,
    COMMUNITY_MEMBERSHIP_REJECTED,
    COMMUNITY_REJECTION_REASON_LABEL,
    COMMUNITY_PAGE_URL_COPIED,
} from "@ui-config/strings";
import { Share2 } from "lucide-react";
import WidgetErrorBoundary from "@components/public/base-layout/template/widget-error-boundary";
import { truncate } from "@courselit/utils";

interface CommunityInfoProps {
    id: string;
    name: string;
    description: TextEditorContent;
    image: string;
    memberCount: number;
    pageId: string;
    onLeave: () => void;
    membership?: Pick<Membership, "status" | "rejectionReason" | "role">;
}

export function CommunityInfo({
    id,
    name,
    description,
    image,
    memberCount,
    membership,
    pageId,
    onLeave,
}: CommunityInfoProps) {
    const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
    const address = useContext(AddressContext);
    const { toast } = useToast();
    const { theme } = useContext(ThemeContext);

    const handleLeaveClick = () => {
        setShowLeaveConfirmation(true);
    };

    const handleConfirmLeave = () => {
        onLeave();
        setShowLeaveConfirmation(false);
    };

    const handleShareClick = () => {
        navigator.clipboard.writeText(`${address.frontend}/p/${pageId}`);
        toast({
            title: TOAST_TITLE_SUCCESS,
            description: COMMUNITY_PAGE_URL_COPIED,
        });
    };

    return (
        <Card>
            <CardHeader className="flex justify-between items-center w-full">
                <CardTitle className="w-full">
                    <div className="flex justify-between items-center w-full">
                        <p>{truncate(name, 200)}</p>
                        <Button
                            variant="ghost"
                            onClick={handleShareClick}
                            size="sm"
                        >
                            <Share2 className="h-5 w-5" />
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <img
                    src={image}
                    alt={`${name} community`}
                    className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                        {description && (
                            <WidgetErrorBoundary widgetName="text-editor">
                                <TextRenderer
                                    json={description}
                                    theme={theme.theme}
                                />
                            </WidgetErrorBoundary>
                        )}
                    </div>
                    <p className="text-sm">
                        <strong>{memberCount.toLocaleString()}</strong>{" "}
                        {getCommunityMembersLabel(memberCount)}
                    </p>
                </div>
                {membership &&
                    membership.status === Constants.MembershipStatus.ACTIVE && (
                        <>
                            <Button
                                onClick={handleLeaveClick}
                                variant="outline"
                                className="w-full"
                            >
                                {COMMUNITY_LEAVE}
                            </Button>
                            <Dialog
                                open={showLeaveConfirmation}
                                onOpenChange={setShowLeaveConfirmation}
                            >
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            {COMMUNITY_LEAVE}
                                        </DialogTitle>
                                        <DialogDescription>
                                            {
                                                COMMUNITY_LEAVE_CONFIRM_DESCRIPTION
                                            }{" "}
                                            <br></br> <br></br>
                                            {
                                                COMMUNITY_LEAVE_CONFIRM_DESCRIPTION_DETAILS
                                            }
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                setShowLeaveConfirmation(false)
                                            }
                                        >
                                            {BUTTON_CANCEL_TEXT}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={handleConfirmLeave}
                                        >
                                            {COMMUNITY_LEAVE}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                {membership &&
                    membership.status ===
                        Constants.MembershipStatus.PENDING && (
                        <Button disabled className="w-full">
                            {COMMUNITY_MEMBERSHIP_PENDING}
                        </Button>
                    )}
                {membership &&
                    membership.status ===
                        Constants.MembershipStatus.REJECTED && (
                        <>
                            <Button disabled className="w-full">
                                {COMMUNITY_MEMBERSHIP_REJECTED}
                            </Button>
                            {membership.rejectionReason && (
                                <Alert variant="destructive">
                                    <AlertDescription>
                                        <b>
                                            {COMMUNITY_REJECTION_REASON_LABEL}
                                        </b>
                                        : {membership.rejectionReason}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </>
                    )}
                {membership &&
                    hasCommunityPermission(
                        membership,
                        Constants.MembershipRole.MODERATE,
                    ) &&
                    membership.status === Constants.MembershipStatus.ACTIVE && (
                        <Link href={`/dashboard/community/${id}/manage`}>
                            <Button variant="outline" className="w-full mt-2">
                                {COMMUNITY_SETTINGS}
                            </Button>
                        </Link>
                    )}
            </CardContent>
        </Card>
    );
}
