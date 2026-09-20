import { Constants, PaymentPlan } from "@courselit/common-models";
import {
    CommunitySchema,
    InternalCommunity,
    InternalPaymentPlan,
    PaymentPlanSchema,
} from "@courselit/orm-models";
import mongoose from "mongoose";

export type FreeCommunityWithPlan = {
    communityId: string;
    name: string;
    autoAcceptMembers: boolean;
    paymentPlan: PaymentPlan;
};

export async function getFreeCommunitiesForDomain(
    domainId: mongoose.Types.ObjectId | string,
): Promise<FreeCommunityWithPlan[]> {
    const domain =
        typeof domainId === "string"
            ? new mongoose.Types.ObjectId(domainId)
            : domainId;

    const freePlans = await getPaymentPlanModel()
        .find({
            domain,
            entityType: Constants.MembershipEntityType.COMMUNITY,
            type: Constants.PaymentPlanType.FREE,
            archived: false,
            internal: { $ne: true },
        })
        .lean<InternalPaymentPlan[]>();

    if (freePlans.length === 0) {
        return [];
    }

    const plansByCommunityId = new Map(
        freePlans.map((plan) => [plan.entityId, plan]),
    );

    const communities = await getCommunityModel()
        .find({
            domain,
            communityId: { $in: Array.from(plansByCommunityId.keys()) },
            deleted: false,
            enabled: true,
        })
        .lean<InternalCommunity[]>();

    return communities
        .map((community) => {
            const paymentPlan = plansByCommunityId.get(community.communityId);
            if (!paymentPlan) {
                return null;
            }

            return {
                communityId: community.communityId,
                name: community.name,
                autoAcceptMembers: community.autoAcceptMembers,
                paymentPlan: paymentPlan as PaymentPlan,
            };
        })
        .filter((item): item is FreeCommunityWithPlan => item !== null);
}

function getCommunityModel(): mongoose.Model<InternalCommunity> {
    return (mongoose.models.Community ||
        mongoose.model(
            "Community",
            CommunitySchema,
        )) as mongoose.Model<InternalCommunity>;
}

function getPaymentPlanModel(): mongoose.Model<InternalPaymentPlan> {
    return (mongoose.models.PaymentPlan ||
        mongoose.model(
            "PaymentPlan",
            PaymentPlanSchema,
        )) as mongoose.Model<InternalPaymentPlan>;
}
