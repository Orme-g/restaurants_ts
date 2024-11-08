import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/blog" }),
    endpoints: (builder) => ({
        getBlogPosts: builder.query({
            query: () => "/posts",
        }),
    }),
});

export const { useGetBlogPostsQuery } = blogApi;
