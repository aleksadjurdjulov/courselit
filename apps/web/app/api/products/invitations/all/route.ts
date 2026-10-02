import { NextRequest, NextResponse } from "next/server";
import { inviteCustomerToAllPublishedProducts } from "@/graphql/users/logic";
import {
    publicApiError,
    validateEmail,
    validatePublicApiRequestWithJsonBody,
} from "@/app/api/public-api";
import { serializeBulkCustomerInvitation } from "../invitation-response";

const customerInvitationFields = new Set(["email", "tags"]);

function getUnsupportedField(body: Record<string, unknown>) {
    return Object.keys(body).find((key) => !customerInvitationFields.has(key));
}

export async function POST(req: NextRequest) {
    const auth = await validatePublicApiRequestWithJsonBody(req);
    if (auth.error) {
        return auth.error;
    }

    const body = auth.body as { email?: string; tags?: string[] };
    const unsupportedField = getUnsupportedField(body);
    if (unsupportedField) {
        return publicApiError(
            "bad_request",
            `Unsupported customer invitation field: ${unsupportedField}`,
            400,
        );
    }
    if (!body.email) {
        return publicApiError("bad_request", "Email is required", 400);
    }
    const emailError = validateEmail(body.email);
    if (emailError) {
        return publicApiError("bad_request", emailError, 400);
    }
    if (body.tags !== undefined && !Array.isArray(body.tags)) {
        return publicApiError(
            "bad_request",
            "Tags must be an array of strings",
            400,
        );
    }
    if (
        body.tags !== undefined &&
        !body.tags.every((tag) => typeof tag === "string")
    ) {
        return publicApiError(
            "bad_request",
            "Tags must be an array of strings",
            400,
        );
    }

    try {
        const result = await inviteCustomerToAllPublishedProducts(
            body.email,
            body.tags || [],
            auth.ctx as any,
        );

        return NextResponse.json(serializeBulkCustomerInvitation(result), {
            status: 201,
        });
    } catch (error: any) {
        return publicApiError(
            "unprocessable_entity",
            error.message || "Unable to invite customer",
            422,
        );
    }
}
