import AccountNetworkModel from "@models/AccountNetwork";
import AccountSignInModel from "@models/AccountSignIn";
import connectToDatabase from "@/services/db";
import { deleteSessionsForUser } from "./sessions";

export async function cleanupAccountSharingData(
    authUserId: string,
): Promise<void> {
    await connectToDatabase();
    await Promise.all([
        AccountNetworkModel.deleteMany({ authUserId }),
        AccountSignInModel.deleteMany({ authUserId }),
        deleteSessionsForUser(authUserId),
    ]);
}
