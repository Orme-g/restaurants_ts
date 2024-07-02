import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IComment } from "../types/commentsTypes";

export const commentsApi = createApi({
    reducerPath: "commentsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        getComments: builder.query<IComment[], string>({
            query: (id: string) => `/best-doner/comments/${id}`,
            providesTags: ["Comments"],
        }),
        postComment: builder.mutation({
            query: (comment) => ({
                url: "/best-doner/comments",
                method: "POST",
                body: comment,
            }),
            invalidatesTags: ["Comments"],
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `/best-doner/comments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Comments"],
        }),
        likeComment: builder.mutation({
            query: (id) => ({
                url: `/best-doner/comments/like/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Comments"],
        }),
        dislikeComment: builder.mutation({
            query: (id) => ({
                url: `/best-doner/comments/dislike/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Comments"],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    usePostCommentMutation,
    useDeleteCommentMutation,
    useLikeCommentMutation,
    useDislikeCommentMutation,
} = commentsApi;
