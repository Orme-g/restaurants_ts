import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        getComments: builder.query({
            query: (id) => `/best-doner/comments/${id}`,
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
        getDonersList: builder.query({
            query: () => "/best-doner",
        }),
        getSingleDonerRestaurant: builder.query({
            query: (id) => `/best-doner/${id}`,
        }),
        addDonerArticle: builder.mutation({
            query: (data) => ({
                url: "/best-doner/add",
                method: "POST",
                body: data,
            }),
        }),
        getSortedRestaurants: builder.query({
            query: (sort) => `/sorted-restaurants/${sort}`,
        }),
        login: builder.mutation({
            query: (loginData) => ({
                url: "/login",
                method: "POST",
                body: loginData,
            }),
        }),
        registration: builder.mutation({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/profile`,
                method: "PATCH",
                body: data,
            }),
        }),
    }),
})

export const {
    useGetCommentsQuery,
    usePostCommentMutation,
    useDeleteCommentMutation,
    useGetDonersListQuery,
    useGetSingleDonerRestaurantQuery,
    useLoginMutation,
    useRegistrationMutation,
    useLikeCommentMutation,
    useDislikeCommentMutation,
    useGetSortedRestaurantsQuery,
    useChangePasswordMutation,
    useAddDonerArticleMutation,
} = apiSlice
