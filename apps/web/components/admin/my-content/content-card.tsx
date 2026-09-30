import { ProgressBar } from "./progress-bar";
import type { ContentItem, ContentPerson } from "./content";
import {
    ContentCard,
    ContentCardContent,
    ContentCardImage,
    ContentCardHeader,
    Image,
} from "@courselit/components-library";
import { Constants } from "@courselit/common-models";
import { BadgeCheck, Download } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Badge } from "@components/ui/badge";
import {
    COURSE_TYPE_COURSE,
    COURSE_TYPE_DOWNLOAD,
    PRODUCT_LECTURER_HEADER,
    PRODUCT_MODERATOR_HEADER,
    formatLessonsCompleted,
} from "@ui-config/strings";

interface ContentCardProps {
    item: ContentItem;
}

export function MyContentCard({ item }: ContentCardProps) {
    const { entity, entityType } = item;
    const progress =
        entity.totalLessons && entity.completedLessonsCount
            ? (entity.completedLessonsCount / entity.totalLessons) * 100
            : 0;
    const people = [
        entity.lecturer?.name
            ? { person: entity.lecturer, role: PRODUCT_LECTURER_HEADER }
            : null,
        entity.moderator?.name
            ? { person: entity.moderator, role: PRODUCT_MODERATOR_HEADER }
            : null,
    ].filter(Boolean) as { person: ContentPerson; role: string }[];

    return (
        <ContentCard
            key={item.entity.id}
            href={
                entityType.toLowerCase() ===
                Constants.MembershipEntityType.COURSE
                    ? `/course/${item.entity.slug}/${item.entity.id}`
                    : `/dashboard/community/${item.entity.id}`
            }
        >
            <ContentCardImage
                src={item.entity.featuredImage?.file}
                alt={item.entity.title}
            />
            <ContentCardContent>
                <ContentCardHeader>{item.entity.title}</ContentCardHeader>
                {people.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        {people.map(({ person, role }) => (
                            <div
                                key={`${role}-${person.userId || person.name}`}
                                className="flex items-center gap-2"
                            >
                                <Image
                                    src={
                                        person.avatar?.file ||
                                        person.avatar?.thumbnail ||
                                        ""
                                    }
                                    alt={person.name || role}
                                    width="w-8"
                                    height="h-8"
                                    className="rounded-full"
                                    objectFit="cover"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium leading-tight">
                                        {person.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground leading-tight">
                                        {role}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    ""
                )}
                {entityType.toLowerCase() === Constants.CourseType.COURSE ? (
                    <div className="flex justify-between">
                        <Badge variant="secondary">
                            {entity.type === Constants.CourseType.COURSE ? (
                                <BookOpen className="h-4 w-4 mr-1" />
                            ) : (
                                <Download className="h-4 w-4 mr-1" />
                            )}
                            {entity.type === Constants.CourseType.COURSE
                                ? COURSE_TYPE_COURSE
                                : COURSE_TYPE_DOWNLOAD}
                        </Badge>
                        {entity.certificateId && (
                            <p className="flex items-center text-sm text-muted-foreground">
                                <BadgeCheck className="h-4 w-4 mr-1" />
                                Certificate
                            </p>
                        )}
                    </div>
                ) : (
                    ""
                )}
                {entityType.toLowerCase() === Constants.CourseType.COURSE &&
                entity.type === Constants.CourseType.COURSE &&
                entity.totalLessons ? (
                    <div className="space-y-2 mt-4">
                        <ProgressBar value={progress} />
                        <p className="text-sm text-muted-foreground flex justify-between">
                            <span>
                                {formatLessonsCompleted(
                                    entity.completedLessonsCount ?? 0,
                                    entity.totalLessons,
                                )}
                            </span>
                            <span>{`${Math.round(progress)}%`}</span>
                        </p>
                    </div>
                ) : (
                    ""
                )}
            </ContentCardContent>
        </ContentCard>
    );
}
