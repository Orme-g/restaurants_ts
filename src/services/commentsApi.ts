import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentUrl } from "../../URLs";

import type { IComment } from "../types/commentsTypes";

export const commentsApi = createApi({
    reducerPath: "commentsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${currentUrl}/comments`,
    }),
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        getComments: builder.query<IComment[], string>({
            query: (id) => `/${id}`,
            providesTags: ["Comments"],
        }),
        getSingleCommentData: builder.query<IComment, string>({
            query: (commentId: string) => `/single-comment/${commentId}`,
        }),
        postComment: builder.mutation({
            query: (comment) => ({
                url: "/",
                method: "POST",
                body: comment,
            }),
            invalidatesTags: ["Comments"],
        }),
        evaluateComment: builder.mutation({
            query: (data) => ({
                url: "/evaluate-comment",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Comments"],
        }),
        deleteComment: builder.mutation<{ message: string }, { id: string; reason: string }>({
            query: (data) => ({
                url: `/delete-comment`,
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
