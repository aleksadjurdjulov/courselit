"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider
            {...props}
            // Avoid React 19 "Encountered a script tag while rendering" warning
            // from next-themes' FOUC-prevention script (pacocoursey/next-themes#387).
            scriptProps={{ type: "application/json" }}
        >
            {children}
        </NextThemesProvider>
    );
}
