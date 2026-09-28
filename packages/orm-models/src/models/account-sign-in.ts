import mongoose from "mongoose";

export interface InternalAccountSignIn extends mongoose.Document {
    domain: mongoose.Types.ObjectId;
    authUserId: string;
    sessionId?: string;
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
    networkKey?: string;
    country?: string;
}

export const AccountSignInSchema = new mongoose.Schema<InternalAccountSignIn>(
    {
        domain: { type: mongoose.Schema.Types.ObjectId, required: true },
        authUserId: { type: String, required: true },
        sessionId: { type: String },
        ipAddress: { type: String },
        userAgent: { type: String },
        deviceId: { type: String },
        networkKey: { type: String },
        country: { type: String },
    },
    {
        timestamps: true,
    },
);

AccountSignInSchema.index({ authUserId: 1, createdAt: -1 });
AccountSignInSchema.index({ authUserId: 1, deviceId: 1 });
