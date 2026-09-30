import { Constants } from "@courselit/common-models";
import type { Media } from "@courselit/common-models";

export interface FeaturedImage {
    file: string;
    thumbnail: string;
}

export interface ContentPerson {
    userId?: string;
    name?: string;
    avatar?: Pick<Media, "file" | "thumbnail"> | null;
}

export interface Entity {
    id: string;
    title: string;
    slug?: string;
    membersCount?: number;
    totalLessons?: number;
    completedLessonsCount?: number;
    featuredImage: FeaturedImage;
    type:
        | typeof Constants.CourseType.COURSE
        | typeof Constants.CourseType.DOWNLOAD;
    certificateId?: string;
    lecturer?: ContentPerson | null;
    moderator?: ContentPerson | null;
}

export interface ContentItem {
    entity: Entity;
    entityType: "community" | "course";
}
