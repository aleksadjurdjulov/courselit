import mongoose, { Model } from "mongoose";
import {
    AccountNetworkSchema,
    InternalAccountNetwork,
} from "@courselit/orm-models";

const AccountNetworkModel =
    (mongoose.models.AccountNetwork as
        | Model<InternalAccountNetwork>
        | undefined) ||
    mongoose.model<InternalAccountNetwork>(
        "AccountNetwork",
        AccountNetworkSchema,
    );

export type { InternalAccountNetwork };
export default AccountNetworkModel;
