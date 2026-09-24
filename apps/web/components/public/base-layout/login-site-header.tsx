"use client";

import {
    LOGIN_NAV_COURSES,
    LOGIN_NAV_FAQ,
    LOGIN_NAV_HOME,
    LOGIN_NAV_INSTRUCTORS,
    LOGIN_NAV_LOGO_ALT,
    LOGIN_NAV_MENU_CLOSE,
    LOGIN_NAV_MENU_OPEN,
} from "@/ui-config/strings";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import "./login-site-header.css";

const MARKETING_SITE_ORIGIN = "https://future-fizio-hub.webflow.io";

const NAV_LINKS = [
    { label: LOGIN_NAV_HOME, href: `${MARKETING_SITE_ORIGIN}/` },
    { label: LOGIN_NAV_COURSES, href: `${MARKETING_SITE_ORIGIN}/kursevi` },
    {
        label: LOGIN_NAV_INSTRUCTORS,
        href: `${MARKETING_SITE_ORIGIN}/predavaci`,
    },
    { label: LOGIN_NAV_FAQ, href: `${MARKETING_SITE_ORIGIN}/faq` },
];

const linkClassName =
    "font-[Satoshi,Arial,sans-serif] text-[1.125rem] font-bold leading-none text-[#22262d] no-underline transition-colors duration-300 hover:text-[#00afa3]";

export default function LoginSiteHeader({ fallback }: { fallback: ReactNode }) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    if (pathname !== "/login" && pathname !== "/logout") {
        return <>{fallback}</>;
    }

    return (
        <header className="sticky top-0 z-[1000] bg-[#f4f1ed] shadow-[0_3px_20px_-3px_rgba(0,0,0,0.2)]">
            <div className="mx-auto flex w-full max-w-[1212px] items-center justify-between px-4">
                <a href={`${MARKETING_SITE_ORIGIN}/`} className="shrink-0">
                    <img
                        src="/future-fizio-hub-logo.png"
                        alt={LOGIN_NAV_LOGO_ALT}
                        className="h-auto w-[180px]"
                    />
                </a>
                <nav className="hidden items-center gap-[18px] min-[992px]:flex">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`${linkClassName} px-5 py-5`}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <button
                    type="button"
                    className="p-[18px] text-[#22262d] min-[992px]:hidden"
                    aria-expanded={menuOpen}
                    aria-label={
                        menuOpen ? LOGIN_NAV_MENU_CLOSE : LOGIN_NAV_MENU_OPEN
                    }
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>
            {menuOpen && (
                <nav className="flex flex-col items-center gap-6 bg-[#f4f1ed] px-4 pb-10 pt-5 min-[992px]:hidden">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`${linkClassName} py-3 text-center`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
}

function MenuIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
