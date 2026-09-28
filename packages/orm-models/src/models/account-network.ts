import mongoose from "mongoose";

export interface InternalAccountNetwork extends mongoose.Document {
    domain: mongoose.Types.ObjectId;
    authUserId: string;
    networkKey: string;
    country?: string;
    lastSeenAt: Date;
}

export const AccountNetworkSchema = new mongoose.Schema<InternalAccountNetwork>(
    {
        domain: { type: mongoose.Schema.Types.ObjectId, required: true },
        authUserId: { type: String, required: true },
        networkKey: { type: String, required: true },
        country: { type: String },
        lastSeenAt: { type: Date, required: true },
    },
    {
        timestamps: true,
    },
);

AccountNetworkSchema.index({ authUserId: 1, networkKey: 1 }, { unique: true });
