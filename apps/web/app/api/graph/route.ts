import { NextRequest } from "next/server";
import schema from "@/graphql";
import { graphql } from "graphql";
import { getBackendAddress } from "@/app/actions";
import User from "@models/User";
import { auth } from "@/auth";
import { als } from "@/async-local-storage";
import { getCachedDomain } from "@/lib/domain-cache";

async function updateLastActive(user: any) {
    const dateNow = new Date();
    dateNow.setUTCHours(0, 0, 0, 0);
    const userLastActiveDate = new Date(user.updatedAt);
    userLastActiveDate.setUTCHours(0, 0, 0, 0);

    if (dateNow.getTime() > userLastActiveDate.getTime()) {
        user.updatedAt = new Date();
        await user.save();
    }
}

export async function POST(req: NextRequest) {
    const domainName = req.headers.get("domain");
    if (!domainName) {
        return Response.json(
            { errors: [{ message: "Domain header is missing" }] },
            { status: 400 },
        );
    }

    const [domain, session, body] = await Promise.all([
        getCachedDomain(domainName),
        auth.api.getSession({ headers: req.headers }),
        req.json(),
    ]);

    if (!domain) {
        return Response.json(
            { errors: [{ message: "Domain not found" }] },
            { status: 404 },
        );
    }

    if (!body.hasOwnProperty("query")) {
        return Response.json({ error: "Query is missing" }, { status: 400 });
    }

    const map = new Map();
    map.set("domain", domainName);
    map.set("domainId", req.headers.get("domainId") || domain._id.toString());
    als.enterWith(map);

    let user;
    if (session) {
        user = await User.findOne({
            email: session.user!.email,
            domain: domain._id,
            active: true,
        });

        if (user) {
            updateLastActive(user);
        }
    }

    let query, variables;
    if (typeof body.query === "string") {
        query = body.query;
        variables = body.variables;
    } else {
        query = body.query.query;
        variables = body.query.variables;
    }
    const contextValue = {
        user,
        subdomain: domain,
        address: await getBackendAddress(req.headers),
    };
    const response = await graphql({
        schema,
        source: query,
        rootValue: null,
        contextValue,
        variableValues: variables,
    });
    return Response.json(response);
}
