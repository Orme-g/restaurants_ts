import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IBlogPost } from "../types/blogPost";
import type { IBlogData } from "../types/userData";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/blog" }),
    endpoints: (builder) => ({
        getBlogPost: builder.query<IBlogPost, string>({
            query: (postId: string) => `/blog-post/${postId}`,
        }),
        getSortedPosts: builder.query<IBlogPost[], string>({
            query: (type: string) => `/posts/${type}`,
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
    }),
});

export const {
    useGetBlogPostQuery,
    useGetSortedPostsQuery,
    useGetTopAuthorsIdsQuery,
    useGetDataForBadgeQuery,
    useGetUserPostsQuery,
    useGetPostsByThemeQuery,
} = blogApi;
