import { InternalCourse, CourseSchema } from "@courselit/orm-models";
import mongoose, { Model } from "mongoose";

const CourseModel =
    (mongoose.models.Course as Model<InternalCourse> | undefined) ||
    mongoose.model<InternalCourse>("Course", CourseSchema);

if (!CourseModel.schema.path("bunnyEmbedTokenKey")) {
    // The first compiled Course model stays cached for the life of the process.
    CourseModel.schema.add({
        bunnyEmbedTokenKey: { type: String },
    });
}

export type { InternalCourse };
export default CourseModel;
