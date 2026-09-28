"use client";

import { type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavProjects({
    projects,
}: {
    projects: {
        name: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
    }[];
}) {
    const { isMobile } = useSidebar();

    return (
        // <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroup>
            {/* <SidebarGroupLabel>Projects</SidebarGroupLabel> */}
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                            asChild
                            isActive={item.isActive}
                            tooltip={item.name}
                        >
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
