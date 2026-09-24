import {
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
} from "graphql";
import types from "./types";
import { getLesson, getLessonDetails, signLessonEmbed } from "./logic";
import GQLContext from "../../models/GQLContext";

export default {
    getLesson: {
        type: types.lessonType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLID),
            },
        },
        resolve: (_: any, { id }: { id: string }, context: GQLContext) =>
            getLesson(id, context),
    },
    getLessonDetails: {
        type: types.lessonType,
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLString),
            },
            courseId: {
                type: GraphQLString,
            },
            preview: {
                type: GraphQLBoolean,
            },
        },
        resolve: (
            _: any,
            {
                id,
                courseId,
                preview,
            }: { id: string; courseId?: string; preview?: boolean },
            context: GQLContext,
        ) => getLessonDetails(id, context, courseId, preview),
    },
    signLessonEmbed: {
        type: new GraphQLNonNull(GraphQLString),
        args: {
            courseId: {
                type: new GraphQLNonNull(GraphQLString),
            },
            html: {
                type: new GraphQLNonNull(GraphQLString),
            },
        },
        resolve: (
            _: any,
            { courseId, html }: { courseId: string; html: string },
            context: GQLContext,
        ) => signLessonEmbed(courseId, html, context),
    },
};
