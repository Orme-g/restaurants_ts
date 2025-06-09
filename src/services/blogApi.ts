import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { currentUrl } from "../../URLs";

import type { IBlogPost } from "../types/blogPost";
import type { IBlogData } from "../types/userData";
import { url } from "inspector";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${currentUrl}/blog` }),
    tagTypes: ["PostData"],
    endpoints: (builder) => ({
        getBlogPost: builder.query<IBlogPost, string>({
            query: (postId: string) => `/blog-post/${postId}`,
            providesTags: ["PostData"],
        }),
        getSortedPosts: builder.query<IBlogPost[], { type: string; number: number }>({
            query: ({ type, number }) => ({
                url: `/posts/${type}`,
                params: { number },
            }),
        }),
        getTopAuthorsIds: builder.query<string[], void>({
            query: () => `/top-authors`,
            // transformResponse: (response: IUserData[]) => response.map((item) => item.blogData),
        }),
        getDataForBadge: builder.query<IBlogData, string>({
            query: (userId: string) => `/badge-data/${userId}`,
        }),
        getUserPosts: builder.query<IBlogPost[], string>({
            query: (userId) => `/user-posts/${userId}`,
        }),
        getPostsByTheme: builder.query<IBlogPost[], string>({
            query: (theme: string) => `/blog-posts/${theme}`,
        }),
        updateLikesOrCommentsCount: builder.mutation({
            query: (data) => ({
                url: "/update-likes-comments",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["PostData"],
        }),
    }),
});

export const {
    useGetBlogPostQuery,
    useGetSortedPostsQuery,
    useGetTopAuthorsIdsQuery,
    useGetDataForBadgeQuery,
    useGetUserPostsQuery,
    useGetPostsByThemeQuery,
    useUpdateLikesOrCommentsCountMutation,
} = blogApi;
