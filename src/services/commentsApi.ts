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
            query: (id: string) => `/${id}`,
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
        deleteComment: builder.mutation({
            query: (data) => ({
                url: `/${data.id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Comments"],
        }),
        evaluateComment: builder.mutation({
            query: (data) => ({
                url: "/evaluate",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Comments"],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    usePostCommentMutation,
    useDeleteCommentMutation,
    useEvaluateCommentMutation,
    useGetSingleCommentDataQuery,
} = commentsApi;
