import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IComment } from "../types/commentsTypes";

export const commentsApi = createApi({
    reducerPath: "commentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/best-doner/comments" }),
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        getComments: builder.query<IComment[], string>({
            query: (id: string) => `/${id}`,
            providesTags: ["Comments"],
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
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
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
} = commentsApi;
