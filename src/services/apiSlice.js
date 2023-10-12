
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'api', 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000'}),
    tagTypes: ['Comments'],  
    endpoints: builder => ({
        getComments: builder.query({
            query: (id) => `/best-doner/comments/${id}`,
            providesTags: ['Comments']  
        }),
        postComment: builder.mutation({
            query: (comment) => ({
                url: '/best-doner/comments',
                method: 'POST',
                body: comment 
            }),
            invalidatesTags: ['Comments']
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url:`/best-doner/comments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comments']
        }),
        getDonersList: builder.query({
            query: () => '/best-doner'
        }),
        getSingleDonerRestaurant: builder.query({
            query: (id) => `/best-doner/${id}`
        })
    })
})

export const {
    useGetCommentsQuery, 
    usePostCommentMutation, 
    useDeleteCommentMutation,
    useGetDonersListQuery,
    useGetSingleDonerRestaurantQuery
} = apiSlice