"use client";

import { Section, Text1, Button } from "@courselit/page-primitives";
import { LOGOUT, LOGOUT_MESSAGE } from "@ui-config/strings";
import { useContext } from "react";
import { ThemeContext } from "@components/contexts";
import { authClient } from "@/lib/auth-client";
import { useToast } from "@courselit/components-library";
import "@/components/public/base-layout/login-site-header.css";

export default function ClientSide() {
    const { theme } = useContext(ThemeContext);
    const { toast } = useToast();

    const handleLogout = async () => {
        const { error } = await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/login";
                },
            },
        });

        if (error) {
            toast({
                title: "Error",
                description: error?.message,
                variant: "destructive",
            });
        }
    };

    return (
        <Section theme={theme.theme} className="ff-login min-h-screen">
            <div className="flex min-h-screen flex-col">
                <div className="mx-auto flex w-full grow items-center justify-center px-4 lg:max-w-[1200px]">
                    <div className="flex w-full flex-col items-center gap-4 lg:w-[360px]">
                        <Text1
                            theme={theme.theme}
                            className="ff-login-copy text-center"
                        >
                            {LOGOUT_MESSAGE}
                        </Text1>
                        <Button
                            theme={theme.theme}
                            onClick={handleLogout}
                            className="ff-login-button w-full"
                        >
                            {LOGOUT}
                        </Button>
                    </div>
                </div>
            </div>
        </Section>
    );
}
