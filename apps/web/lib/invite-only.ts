import DomainModel, { Domain } from "@models/Domain";
import UserModel from "@models/User";
import { sanitizeEmail } from "@/lib/sanitize-email";
import mongoose from "mongoose";

export function isInviteOnlyEnabled(
    domain?: Pick<Domain, "settings"> | null,
): boolean {
    return Boolean(domain?.settings?.inviteOnly);
}

export async function findUserByEmailForDomain({
    email,
    domainId,
}: {
    email: string;
    domainId: string | mongoose.Types.ObjectId;
}) {
    return UserModel.findOne({
        email: sanitizeEmail(email),
        domain: domainId,
    }).lean();
}

export async function getDomainInviteOnlyStatus(
    domainId?: string | null,
): Promise<boolean> {
    if (!domainId || !mongoose.isValidObjectId(domainId)) {
        return false;
    }

    const domain = await DomainModel.findById(domainId)
        .select("settings.inviteOnly")
        .lean();

    return isInviteOnlyEnabled(domain as Pick<Domain, "settings"> | null);
}
