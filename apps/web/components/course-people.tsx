"use client";

import { Image } from "@courselit/components-library";
import { User } from "@courselit/common-models";
import { Caption, Subheader1 } from "@courselit/page-primitives";
import { ThemeStyle } from "@courselit/page-models";

export function CoursePeople({
    lecturer,
    moderator,
    lecturerLabel,
    moderatorLabel,
    theme,
    className = "",
}: {
    lecturer?: Pick<User, "name" | "avatar"> | null;
    moderator?: Pick<User, "name" | "avatar"> | null;
    lecturerLabel: string;
    moderatorLabel: string;
    theme?: ThemeStyle;
    className?: string;
}) {
    const people = [
        lecturer ? { person: lecturer, role: lecturerLabel } : null,
        moderator ? { person: moderator, role: moderatorLabel } : null,
    ].filter(Boolean) as {
        person: Pick<User, "name" | "avatar">;
        role: string;
    }[];

    if (people.length === 0) {
        return null;
    }

    return (
        <div className={`flex flex-wrap items-center gap-6 ${className}`}>
            {people.map(({ person, role }) => {
                const name = person.name || "";
                if (!name) {
                    return null;
                }
                return (
                    <div
                        key={`${role}-${name}`}
                        className="flex items-center gap-3"
                    >
                        <Image
                            src={
                                person.avatar?.file || person.avatar?.thumbnail
                            }
                            alt={name}
                            width="w-10"
                            height="h-10"
                            className="rounded-full"
                            objectFit="cover"
                        />
                        <div className="flex flex-col">
                            <Subheader1 theme={theme}>{name}</Subheader1>
                            <Caption
                                theme={theme}
                                className="text-muted-foreground"
                            >
                                {role}
                            </Caption>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
