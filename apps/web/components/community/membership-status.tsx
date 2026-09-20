import { useContext } from "react";
import { Constants, Membership } from "@courselit/common-models";
import { Link } from "@courselit/components-library";
import { ProfileContext } from "@components/contexts";
import {
    COMMUNITY_INCOMPLETE_PROFILE_TITLE,
    COMMUNITY_JOIN_COMPLETE_PROFILE_PREFIX,
    COMMUNITY_JOIN_COMPLETE_PROFILE_LINK,
    COMMUNITY_JOIN_COMPLETE_PROFILE_OR_POST_SUFFIX,
    COMMUNITY_MEMBERSHIP_PENDING,
    COMMUNITY_MEMBERSHIP_REJECTED,
    COMMUNITY_REJECTION_REASON_LABEL,
} from "@ui-config/strings";
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert";
import { Clock } from "@courselit/icons";
import { AlertCircle } from "lucide-react";

export default function MembershipStatus({
    membership,
}: {
    membership?: Pick<Membership, "status" | "rejectionReason" | "role">;
}) {
    const { profile } = useContext(ProfileContext);

    if (!membership) {
        return null;
    }

    const status = membership.status?.toLowerCase();

    return (
        <div className="space-y-4">
            {status === Constants.MembershipStatus.PENDING && (
                <Alert>
                    <Clock className="w-4 h-4" />
                    <AlertTitle className="font-semibold">
                        {COMMUNITY_MEMBERSHIP_PENDING}
                    </AlertTitle>
                </Alert>
            )}
            {status === Constants.MembershipStatus.REJECTED && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-semibold">
                        {COMMUNITY_MEMBERSHIP_REJECTED}
                    </AlertTitle>
                    <AlertDescription>
                        {COMMUNITY_REJECTION_REASON_LABEL}:{" "}
                        {membership.rejectionReason}
                    </AlertDescription>
                </Alert>
            )}
            {!profile?.name && (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-semibold">
                        {COMMUNITY_INCOMPLETE_PROFILE_TITLE}
                    </AlertTitle>
                    <AlertDescription>
                        {COMMUNITY_JOIN_COMPLETE_PROFILE_PREFIX}{" "}
                        <span className="underline">
                            <Link href={"/dashboard/profile"}>
                                {COMMUNITY_JOIN_COMPLETE_PROFILE_LINK}
                            </Link>
                        </span>{" "}
                        {COMMUNITY_JOIN_COMPLETE_PROFILE_OR_POST_SUFFIX}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
