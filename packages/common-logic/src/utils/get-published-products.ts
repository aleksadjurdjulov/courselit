import { Constants } from "@courselit/common-models";
import { CourseSchema, InternalCourse } from "@courselit/orm-models";
import mongoose from "mongoose";

export type PublishedProduct = {
    courseId: string;
    title: string;
};

export async function getPublishedProductsForDomain(
    domainId: mongoose.Types.ObjectId | string,
): Promise<PublishedProduct[]> {
    const domain =
        typeof domainId === "string"
            ? new mongoose.Types.ObjectId(domainId)
            : domainId;

    const products = await getCourseModel()
        .find({
            domain,
            published: true,
            type: {
                $in: [
                    Constants.CourseType.COURSE,
                    Constants.CourseType.DOWNLOAD,
                ],
            },
        })
        .select({ courseId: 1, title: 1, _id: 0 })
        .sort({ createdAt: 1 })
        .lean<PublishedProduct[]>();

    return products;
}

function getCourseModel(): mongoose.Model<InternalCourse> {
    return (mongoose.models.Course ||
        mongoose.model(
            "Course",
            CourseSchema,
        )) as mongoose.Model<InternalCourse>;
}
