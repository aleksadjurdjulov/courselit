/**
 * Seeds a demo course with modules and text lessons for local development.
 *
 * Usage:
 *   pnpm --filter @courselit/scripts course:seed [domain-name]
 *
 * Defaults to domain "main". Safe to re-run (idempotent by pageId "demo-course").
 *
 * Environment:
 *   DB_CONNECTION_STRING — MongoDB connection string
 *   Loads apps/web/.env.local or .env when present.
 */
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadEnvFile } from "node:process";
import mongoose from "mongoose";
import { Constants } from "@courselit/common-models";
import { generateUniqueId } from "@courselit/utils";
import {
    CourseSchema,
    DomainSchema,
    LessonSchema,
    PageSchema,
    PaymentPlanSchema,
    UserSchema,
} from "@courselit/orm-models";

const DEMO_PAGE_ID = "demo-course";
const DEMO_TITLE = "Demo Course";

const LOREM =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

function loadEnv() {
    const candidates = [
        resolve(process.cwd(), ".env.local"),
        resolve(process.cwd(), ".env"),
        resolve(process.cwd(), "apps/web/.env.local"),
        resolve(process.cwd(), "apps/web/.env"),
        resolve(process.cwd(), "../../apps/web/.env.local"),
        resolve(process.cwd(), "../../apps/web/.env"),
    ];
    for (const path of candidates) {
        if (existsSync(path)) {
            try {
                loadEnvFile(path);
            } catch {
                // Ignore parse errors; keep trying other files.
            }
        }
    }
}

function loremDoc(text: string) {
    return {
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [{ type: "text", text }],
            },
        ],
    };
}

function courseLayout() {
    return [
        { name: "header", deleteable: false, shared: true },
        { name: "banner" },
        {
            name: "content",
            settings: {
                title: "Kursevi",
                headerAlignment: "center",
            },
        },
        { name: "footer", deleteable: false, shared: true },
    ];
}

loadEnv();

if (!process.env.DB_CONNECTION_STRING) {
    throw new Error("DB_CONNECTION_STRING is not set");
}

const domainName = process.argv[2] || "main";

const Domain = mongoose.model("Domain", DomainSchema);
const Course = mongoose.model("Course", CourseSchema);
const Lesson = mongoose.model("Lesson", LessonSchema);
const Page = mongoose.model("Page", PageSchema);
const PaymentPlan = mongoose.model("PaymentPlan", PaymentPlanSchema);
const User = mongoose.model("User", UserSchema);

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING!);

    const domain = await Domain.findOne({ name: domainName });
    if (!domain) {
        throw new Error(`Domain not found: ${domainName}`);
    }

    const owner = await User.findOne({
        domain: domain._id,
        email: domain.email,
    });
    if (!owner) {
        throw new Error(`Owner user not found for ${domain.email}`);
    }

    const existing = await Course.findOne({
        domain: domain._id,
        pageId: DEMO_PAGE_ID,
    });
    if (existing) {
        console.log("Demo course already exists:");
        console.log(`  title: ${existing.title}`);
        console.log(`  courseId: ${existing.courseId}`);
        console.log(`  page: /p/${DEMO_PAGE_ID}`);
        console.log(`  viewer: /course/${existing.slug}/${existing.courseId}`);
        await mongoose.connection.close();
        return;
    }

    const modules = [
        {
            id: generateUniqueId(),
            name: "Module 1 — Getting Started",
            rank: 1000,
            lessons: [
                { id: generateUniqueId(), title: "Welcome to the course" },
                { id: generateUniqueId(), title: "How this course works" },
            ],
        },
        {
            id: generateUniqueId(),
            name: "Module 2 — Core Concepts",
            rank: 2000,
            lessons: [
                { id: generateUniqueId(), title: "Key ideas overview" },
                { id: generateUniqueId(), title: "Putting it into practice" },
            ],
        },
    ];

    const lessonIds = modules.flatMap((module) =>
        module.lessons.map((lesson) => lesson.id),
    );

    const page = await Page.create({
        domain: domain._id,
        pageId: DEMO_PAGE_ID,
        name: DEMO_TITLE,
        type: Constants.PageType.PRODUCT,
        creatorId: owner.userId,
        layout: courseLayout(),
        title: DEMO_TITLE,
        deleteable: true,
    });

    const course = await Course.create({
        domain: domain._id,
        title: DEMO_TITLE,
        slug: DEMO_PAGE_ID,
        pageId: DEMO_PAGE_ID,
        cost: 0,
        costType: Constants.ProductPriceType.FREE,
        privacy: Constants.ProductAccessType.PUBLIC,
        type: Constants.CourseType.COURSE,
        creatorId: owner.userId,
        published: true,
        lessons: lessonIds,
        groups: modules.map((module) => ({
            _id: module.id,
            name: module.name,
            rank: module.rank,
            collapsed: false,
            lessonsOrder: module.lessons.map((lesson) => lesson.id),
        })),
    });

    page.entityId = course.courseId;
    await page.save();

    const paymentPlan = await PaymentPlan.create({
        domain: domain._id,
        userId: owner.userId,
        name: "Free",
        type: Constants.PaymentPlanType.FREE,
        entityId: course.courseId,
        entityType: Constants.MembershipEntityType.COURSE,
        archived: false,
        internal: false,
    });

    course.defaultPaymentPlan = paymentPlan.planId;
    await course.save();

    for (const module of modules) {
        for (const [index, lesson] of module.lessons.entries()) {
            await Lesson.create({
                domain: domain._id,
                lessonId: lesson.id,
                title: lesson.title,
                type: Constants.LessonType.TEXT,
                content: loremDoc(
                    `${LOREM} (Module: ${module.name}, lesson ${index + 1}.)`,
                ),
                creatorId: owner.userId,
                courseId: course.courseId,
                groupId: module.id,
                published: true,
                requiresEnrollment: true,
                downloadable: false,
            });
        }
    }

    console.log("Demo course created:");
    console.log(`  title: ${course.title}`);
    console.log(`  courseId: ${course.courseId}`);
    console.log(`  modules: ${modules.length}`);
    console.log(`  lessons: ${lessonIds.length}`);
    console.log(`  page: /p/${DEMO_PAGE_ID}`);
    console.log(`  viewer: /course/${course.slug}/${course.courseId}`);

    await mongoose.connection.close();
}

main().catch(async (error) => {
    console.error(error);
    try {
        await mongoose.connection.close();
    } catch {
        // ignore
    }
    process.exit(1);
});
