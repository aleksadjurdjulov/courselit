"use client";

import { AppSidebar } from "@components/admin/dashboard-skeleton/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProfileContext, ThemeContext } from "@components/contexts";
import { themes } from "@courselit/page-primitives";
import { Theme } from "@courselit/page-models";
import { isRegularUser } from "@/lib/is-regular-user";
import { useContext } from "react";
import "@/components/public/base-layout/future-fizio-learner.css";

export default function LayoutWithSidebar({
    children,
}: {
    children: React.ReactNode;
}) {
    const { profile } = useContext(ProfileContext);
    const classicTheme = themes.find((theme) => theme.id === "classic");
    const theme: Theme = {
        id: "classic",
        name: "Classic",
        theme: classicTheme!.theme,
    };

    return (
        <SidebarProvider
            className={isRegularUser(profile) ? "ff-learner" : undefined}
        >
            <AppSidebar />
            <SidebarInset>
                <ThemeContext.Provider value={{ theme, setTheme: () => {} }}>
                    {children}
                </ThemeContext.Provider>
            </SidebarInset>
        </SidebarProvider>
    );
}
