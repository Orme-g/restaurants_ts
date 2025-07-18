import { baseApi } from "./baseApi";
import type { INewComment, IComment } from "../types/commentsTypes";

export const commentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getComments: builder.query<IComment[], string>({
            query: (id) => `/comments/${id}`,
            providesTags: ["Comments"],
        }),
        getSingleCommentData: builder.query<IComment, string>({
            query: (commentId) => `/comments/single-comment/${commentId}`,
        }),
        postComment: builder.mutation<{ message: string }, INewComment>({
            query: (comment) => ({
                url: "/comments/post-comment",
                method: "POST",
                body: comment,
            }),
            invalidatesTags: ["Comments"],
        }),
        evaluateComment: builder.mutation<
            { message: string },
            { id: string; type: "like" | "dislike" }
        >({
            query: (data) => ({
                url: "/comments/evaluate-comment",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Comments", "UserData"],
        }),
        deleteComment: builder.mutation<{ message: string }, { id: string; reason: string }>({
            query: (data) => ({
                url: `/comments/delete-comment`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Comments"],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useGetSingleCommentDataQuery,
    usePostCommentMutation,
    useEvaluateCommentMutation,
    useDeleteCommentMutation,
} = commentsApi;
