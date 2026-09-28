import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import connectToDatabase from "@/services/db";
import { toDate } from "./policy";

export const SESSIONS_COLLECTION = "sessions";

export type StoredAccountSession = {
    token: string;
    createdAt: Date;
    expiresAt: Date;
    deviceId: string | null;
    networkKey: string | null;
    country: string | null;
    lastHeartbeatAt: Date | null;
    ipAddress: string | null;
    userAgent: string | null;
};

type SessionDocument = {
    token?: string;
    createdAt?: Date | string;
    expiresAt?: Date | string;
    deviceId?: string | null;
    networkKey?: string | null;
    country?: string | null;
    lastHeartbeatAt?: Date | string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
};

export function authUserIdFilter(authUserId: string): {
    userId: { $in: Array<string | ObjectId> };
} {
    const ids: Array<string | ObjectId> = [authUserId];
    if (ObjectId.isValid(authUserId)) {
        ids.push(new ObjectId(authUserId));
    }

    return { userId: { $in: ids } };
}

async function sessionsCollection() {
    await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error("Database is not connected");
    }

    return db.collection<SessionDocument>(SESSIONS_COLLECTION);
}

function mapSession(document: SessionDocument): StoredAccountSession | null {
    if (!document.token) {
        return null;
    }

    return {
        token: document.token,
        createdAt: toDate(document.createdAt),
        expiresAt: toDate(document.expiresAt),
        deviceId: document.deviceId || null,
        networkKey: document.networkKey || null,
        country: document.country || null,
        lastHeartbeatAt: document.lastHeartbeatAt
            ? toDate(document.lastHeartbeatAt)
            : null,
        ipAddress: document.ipAddress || null,
        userAgent: document.userAgent || null,
    };
}

export async function listStoredSessions(
    authUserId: string,
): Promise<StoredAccountSession[]> {
    const collection = await sessionsCollection();
    const documents = await collection
        .find(authUserIdFilter(authUserId))
        .toArray();

    return documents
        .map((document) => mapSession(document))
        .filter((session): session is StoredAccountSession => session !== null);
}

export async function deleteSessionsByToken(tokens: string[]): Promise<void> {
    if (tokens.length === 0) {
        return;
    }

    const collection = await sessionsCollection();
    await collection.deleteMany({ token: { $in: tokens } });
}

export async function deleteSessionsForUser(
    authUserId: string,
    exceptDeviceId?: string,
): Promise<void> {
    const collection = await sessionsCollection();
    const filter = authUserIdFilter(authUserId);
    if (exceptDeviceId) {
        await collection.deleteMany({
            ...filter,
            deviceId: { $ne: exceptDeviceId },
        });
        return;
    }

    await collection.deleteMany(filter);
}

export async function touchSession(
    token: string,
    fields: {
        lastHeartbeatAt: Date;
        ipAddress?: string | null;
        networkKey?: string | null;
        country?: string | null;
    },
): Promise<void> {
    const collection = await sessionsCollection();
    const update: Record<string, string | Date> = {
        lastHeartbeatAt: fields.lastHeartbeatAt,
        updatedAt: fields.lastHeartbeatAt,
    };

    if (fields.ipAddress) {
        update.ipAddress = fields.ipAddress;
    }
    if (fields.networkKey) {
        update.networkKey = fields.networkKey;
    }
    if (fields.country) {
        update.country = fields.country;
    }

    await collection.updateOne({ token }, { $set: update });
}
