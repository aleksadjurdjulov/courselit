import { NextResponse, type NextRequest } from "next/server";
import { getBackendAddress } from "@/app/actions";
import { auth } from "./auth";
import { COURSE_VIEWER_CURRENT_URL_HEADER } from "./lib/course-viewer-session-params";

function isLoginPath(pathname: string) {
    return pathname === "/login" || pathname.startsWith("/login/");
}

function isPublicLegalPath(pathname: string) {
    return pathname === "/p/terms" || pathname === "/p/privacy";
}

function requiresAuthentication(pathname: string) {
    if (isLoginPath(pathname) || isPublicLegalPath(pathname)) {
        return false;
    }
    if (pathname.startsWith("/api/") || pathname === "/healthy") {
        return false;
    }
    if (pathname === "/favicon.ico") {
        return false;
    }
    return true;
}

export async function proxy(request: NextRequest) {
    const requestHeaders = request.headers;
    const forwardedProto = request.headers.get("x-forwarded-proto");

    if (!forwardedProto && request.nextUrl.protocol) {
        requestHeaders.set(
            "x-forwarded-proto",
            request.nextUrl.protocol.replace(":", ""),
        );
    }

    // Inbound email is addressed to a shared reply domain. Its tenant is
    // resolved from the opaque reply token, not the request host.
    if (request.nextUrl.pathname.startsWith("/api/inbound-email/")) {
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    if (request.nextUrl.pathname === "/verify-domain") {
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    if (request.nextUrl.pathname.startsWith("/course/")) {
        requestHeaders.set(
            COURSE_VIEWER_CURRENT_URL_HEADER,
            `${request.nextUrl.pathname}${request.nextUrl.search}`,
        );
    }

    const backend = await getBackendAddress(requestHeaders);

    if (request.nextUrl.pathname === "/healthy") {
        return Response.json({ success: true });
    }

    try {
        const response = await fetch(`${backend}/verify-domain`);

        if (!response.ok) {
            throw new Error();
        }

        const resp = await response.json();

        requestHeaders.set("domain", resp.domain);
        requestHeaders.set("domainId", resp.domainId);
        requestHeaders.set("domainEmail", resp.domainEmail);
        requestHeaders.set("domainTitle", resp.domainTitle || "");
        requestHeaders.set(
            "hideCourseLitBranding",
            resp.hideCourseLitBranding || false,
        );
        requestHeaders.set("inviteOnly", String(Boolean(resp.inviteOnly)));
        if (resp.ssoTrustedDomain) {
            requestHeaders.set("ssoTrustedDomain", resp.ssoTrustedDomain);
        }

        if (request.nextUrl.pathname === "/favicon.ico") {
            try {
                if (resp.logo) {
                    const response = await fetch(resp.logo);
                    if (response.ok) {
                        const blob = await response.blob();
                        return new NextResponse(blob, {
                            headers: {
                                "content-type": "image/webp",
                            },
                        });
                    } else {
                        return NextResponse.rewrite(
                            new URL(`/default-favicon.ico`, request.url),
                        );
                    }
                } else {
                    return NextResponse.rewrite(
                        new URL(`/default-favicon.ico`, request.url),
                    );
                }
            } catch (err) {
                return NextResponse.rewrite(
                    new URL(`/default-favicon.ico`, request.url),
                );
            }
        }

        if (request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        if (requiresAuthentication(request.nextUrl.pathname)) {
            const session = await auth.api.getSession({
                headers: requestHeaders,
            });
            if (!session) {
                const returnPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
                return NextResponse.redirect(
                    new URL(
                        `/login?redirect=${encodeURIComponent(returnPath)}`,
                        request.url,
                    ),
                );
            }
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch (err) {
        return Response.json(
            { success: false, error: err.message },
            { status: 404 },
        );
    }
}

export const config = {
    matcher: [
        "/",
        "/favicon.ico",
        "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|txt|xml|woff2?)$).*)",
    ],
};
