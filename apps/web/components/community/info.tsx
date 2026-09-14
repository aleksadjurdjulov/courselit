import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Constants,
    Membership,
    PaymentPlan,
    TextEditorContent,
    UIConstants,
} from "@courselit/common-models";
import { FormEvent, Fragment, useContext, useState } from "react";
import {
    getPlanPrice,
    hasCommunityPermission,
    getCommunityMembersLabel,
} from "@ui-lib/utils";
import {
    Form,
    FormField,
    getSymbolFromCurrency,
    Link,
    useToast,
} from "@courselit/components-library";
import { TextRenderer } from "@courselit/page-blocks";
import {
    AddressContext,
    ProfileContext,
    SiteInfoContext,
    ThemeContext,
} from "@components/contexts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog";
import {
    COMMUNITY_SETTINGS,
    TOAST_TITLE_SUCCESS,
    COMMUNITY_LEAVE,
    BUTTON_CANCEL_TEXT,
    COMMUNITY_JOIN,
    COMMUNITY_JOIN_REASON_LABEL,
    COMMUNITY_JOIN_REASON_PLACEHOLDER,
    COMMUNITY_LEAVE_CONFIRM_DESCRIPTION,
    COMMUNITY_LEAVE_CONFIRM_DESCRIPTION_DETAILS,
    COMMUNITY_MEMBERSHIP_PENDING,
    COMMUNITY_MEMBERSHIP_REJECTED,
    COMMUNITY_REJECTION_REASON_LABEL,
    COMMUNITY_PAGE_URL_COPIED,
    BTN_SEND,
} from "@ui-config/strings";
import { Share2 } from "lucide-react";
import WidgetErrorBoundary from "@components/public/base-layout/template/widget-error-boundary";
import { truncate } from "@courselit/utils";
const { permissions } = UIConstants;

interface CommunityInfoProps {
    id: string;
    name: string;
    description: TextEditorContent;
    image: string;
    memberCount: number;
    paymentPlan?: PaymentPlan;
    joiningReasonText?: string;
    pageId: string;
    onJoin: (joiningReason?: string) => void;
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
    paymentPlan,
    joiningReasonText,
    pageId,
    onJoin,
    onLeave,
}: CommunityInfoProps) {
    const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
    const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
    const [joiningReason, setJoiningReason] = useState("");
    const { amount, period } = paymentPlan
        ? getPlanPrice(paymentPlan)
        : { amount: 0, period: "" };
    const address = useContext(AddressContext);
    const siteinfo = useContext(SiteInfoContext);
    const { profile } = useContext(ProfileContext);
    const currencySymbol =
        getSymbolFromCurrency(siteinfo.currencyISOCode || "USD") || "$";
    const { toast } = useToast();
    const { theme } = useContext(ThemeContext);

    const handleJoinSubmit = async (e: FormEvent) => {
        e.preventDefault();
        onJoin(joiningReason);
    };

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
                {!membership && (
                    <Fragment>
                        {amount > 0 && (
                            <Link
                                href={`/checkout?id=${id}&type=${Constants.MembershipEntityType.COMMUNITY}`}
                                className="w-full"
                            >
                                <Button className="w-full">
                                    {COMMUNITY_JOIN} {currencySymbol}
                                    {amount} {period}
                                </Button>
                            </Link>
                        )}
                        {amount <= 0 && (
                            <Dialog
                                open={isJoinDialogOpen}
                                onOpenChange={setIsJoinDialogOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button className="w-full">
                                        {COMMUNITY_JOIN} {currencySymbol}
                                        {amount} {period}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <Form onSubmit={handleJoinSubmit}>
                                        <div className="space-y-4 mt-4">
                                            <FormField
                                                label={
                                                    joiningReasonText ||
                                                    COMMUNITY_JOIN_REASON_LABEL
                                                }
                                                value={joiningReason}
                                                onChange={(e) =>
                                                    setJoiningReason(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder={
                                                    COMMUNITY_JOIN_REASON_PLACEHOLDER
                                                }
                                                required
                                            />
                                            <Button type="submit">
                                                {BTN_SEND}
                                            </Button>
                                        </div>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        )}
                    </Fragment>
                )}
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
