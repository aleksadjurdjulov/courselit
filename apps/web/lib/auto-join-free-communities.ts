import { Constants } from "@courselit/common-models";
import { getFreeCommunitiesForDomain } from "@courselit/common-logic";
import DomainModel from "@models/Domain";
import mongoose from "mongoose";

export async function autoJoinUserToFreeCommunities({
    domainId,
    userId,
}: {
    domainId: mongoose.Types.ObjectId;
    userId: string;
}): Promise<void> {
    const freeCommunities = await getFreeCommunitiesForDomain(domainId);
    if (freeCommunities.length === 0) {
        return;
    }

    const domain = await DomainModel.findById(domainId);
    if (!domain) {
        return;
    }

    const { getMembership } = await import("@/graphql/users/logic");
    const { activateMembership } = await import("@/app/api/payment/helpers");

    for (const { communityId, paymentPlan } of freeCommunities) {
        const membership = await getMembership({
            domainId,
            userId,
            entityType: Constants.MembershipEntityType.COMMUNITY,
            entityId: communityId,
            planId: paymentPlan.planId,
        });

        if (membership.status === Constants.MembershipStatus.ACTIVE) {
            continue;
        }

        if (!membership.joiningReason) {
            membership.joiningReason = "Auto joined on registration";
        }

        await activateMembership(domain, membership, paymentPlan);
    }
}
