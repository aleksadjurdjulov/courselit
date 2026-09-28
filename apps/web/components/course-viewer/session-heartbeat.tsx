"use client";

import { ProfileContext } from "@components/contexts";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

const LOGIN_REASONS: Record<string, string> = {
    signed_out: "elsewhere",
    signed_in_elsewhere: "elsewhere",
    reauth: "reauth",
};

export default function SessionHeartbeat({
    intervalSeconds = 60,
}: {
    intervalSeconds?: number;
}) {
    const { profile } = useContext(ProfileContext);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const userId = profile?.userId;

    useEffect(() => {
        if (!userId) {
            return;
        }

        let stopped = false;
        const ping = async () => {
            if (stopped || typeof fetch !== "function") {
                return;
            }

            try {
                const response = await fetch("/api/account-session/heartbeat", {
                    method: "POST",
                    credentials: "include",
                    cache: "no-store",
                });
                if (response.ok || stopped) {
                    return;
                }

                const body = (await response.json().catch(() => null)) as {
                    code?: string;
                } | null;
                const reason = body?.code
                    ? LOGIN_REASONS[body.code]
                    : undefined;
                if (!reason || stopped) {
                    return;
                }

                await fetch("/api/auth/sign-out", {
                    method: "POST",
                    credentials: "include",
                }).catch(() => undefined);
                if (stopped) {
                    return;
                }

                const query = searchParams?.toString();
                const returnPath = `${pathname}${query ? `?${query}` : ""}`;
                window.location.assign(
                    `/login?reason=${reason}&redirect=${encodeURIComponent(returnPath)}`,
                );
            } catch {
                // The next ping retries a dropped request.
            }
        };

        void ping();
        const timer = window.setInterval(
            () => {
                void ping();
            },
            Math.max(intervalSeconds, 15) * 1000,
        );

        return () => {
            stopped = true;
            window.clearInterval(timer);
        };
    }, [intervalSeconds, pathname, searchParams, userId]);

    return null;
}
