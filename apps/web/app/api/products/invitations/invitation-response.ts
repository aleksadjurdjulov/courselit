type UserDocument = {
    userId: string;
    email?: string;
    name?: string;
    avatar?: unknown;
};

type MembershipDocument = {
    membershipId?: string;
    userId: string;
    status?: string;
    subscriptionMethod?: string;
    subscriptionId?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};

type BulkInviteProduct = {
    productId: string;
    membership: MembershipDocument;
};

function toIsoString(value?: Date | string) {
    if (!value) {
        return undefined;
    }
    return value instanceof Date ? value.toISOString() : value;
}

export function serializeBulkCustomerInvitation({
    user,
    products,
}: {
    user: UserDocument;
    products: BulkInviteProduct[];
}) {
    return {
        userId: user.userId,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        products: products.map(({ productId, membership }) => ({
            productId,
            membershipId: membership.membershipId,
            membershipStatus: membership.status,
            subscriptionMethod: membership.subscriptionMethod,
            subscriptionId: membership.subscriptionId,
            enrolledAt: toIsoString(membership.createdAt),
            updatedAt: toIsoString(membership.updatedAt),
        })),
    };
}
