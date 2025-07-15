import { baseApi } from "./baseApi";
import type { IBlogPost } from "../types/blogPost";
import type { IBlogData } from "../types/userData";

export const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogPost: builder.query<IBlogPost, string>({
            query: (postId: string) => `/blog/blog-post/${postId}`,
            providesTags: ["PostData"],
        }),
        getSortedPosts: builder.query<IBlogPost[], { type: string; number: number }>({
            query: ({ type, number }) => ({
                url: `/blog/posts/${type}`,
                params: { number },
            }),
        }),
        getTopAuthorsIds: builder.query<string[], void>({
            query: () => `/blog/top-authors`,
            // transformResponse: (response: IUserData[]) => response.map((item) => item.blogData),
        }),
        getDataForBadge: builder.query<IBlogData, string>({
            query: (userId: string) => `/blog/badge-data/${userId}`,
        }),
        getUserPosts: builder.query<IBlogPost[], string>({
            query: (userId) => `/blog/user-posts/${userId}`,
        }),
        getPostsByTheme: builder.query<IBlogPost[], string>({
            query: (theme: string) => `/blog/blog-posts/${theme}`,
        }),
        updateLikesOrCommentsCount: builder.mutation<string, {}>({
            query: (data) => ({
                url: "/blog/update-likes-comments",
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

// import { createApi } from "@reduxjs/toolkit/query/react";
// import { currentUrl } from "../../URLs";
// import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

// import type { IBlogPost } from "../types/blogPost";
// import type { IBlogData } from "../types/userData";

// export const blogApi = createApi({
//     reducerPath: "blogApi",
//     baseQuery: createBaseQueryWithReauth(`${currentUrl}/blog`),
//     tagTypes: ["PostData"],
//     endpoints: (builder) => ({
//         getBlogPost: builder.query<IBlogPost, string>({
//             query: (postId: string) => `/blog-post/${postId}`,
//             providesTags: ["PostData"],
//         }),
//         getSortedPosts: builder.query<IBlogPost[], { type: string; number: number }>({
//             query: ({ type, number }) => ({
//                 url: `/posts/${type}`,
//                 params: { number },
//             }),
//         }),
//         getTopAuthorsIds: builder.query<string[], void>({
//             query: () => `/top-authors`,
//             // transformResponse: (response: IUserData[]) => response.map((item) => item.blogData),
//         }),
//         getDataForBadge: builder.query<IBlogData, string>({
//             query: (userId: string) => `/badge-data/${userId}`,
//         }),
//         getUserPosts: builder.query<IBlogPost[], string>({
//             query: (userId) => `/user-posts/${userId}`,
//         }),
//         getPostsByTheme: builder.query<IBlogPost[], string>({
//             query: (theme: string) => `/blog-posts/${theme}`,
//         }),
//         updateLikesOrCommentsCount: builder.mutation<string, {}>({
//             query: (data) => ({
//                 url: "/update-likes-comments",
//                 method: "PATCH",
//                 body: data,
//             }),
//             invalidatesTags: ["PostData"],
//         }),
//     }),
// });

// export const {
//     useGetBlogPostQuery,
//     useGetSortedPostsQuery,
//     useGetTopAuthorsIdsQuery,
//     useGetDataForBadgeQuery,
//     useGetUserPostsQuery,
//     useGetPostsByThemeQuery,
//     useUpdateLikesOrCommentsCountMutation,
// } = blogApi;
