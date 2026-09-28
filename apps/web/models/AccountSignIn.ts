import mongoose, { Model } from "mongoose";
import {
    AccountSignInSchema,
    InternalAccountSignIn,
} from "@courselit/orm-models";

const AccountSignInModel =
    (mongoose.models.AccountSignIn as
        | Model<InternalAccountSignIn>
        | undefined) ||
    mongoose.model<InternalAccountSignIn>("AccountSignIn", AccountSignInSchema);

export type { InternalAccountSignIn };
export default AccountSignInModel;
