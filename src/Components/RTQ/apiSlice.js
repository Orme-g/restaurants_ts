import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: 'api', 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000'}),
    tagTypes: ['Comments'],   // Массив тэгов - всё тэги
    endpoints: builder => ({
        getComments: builder.query({
            query: (some) => `/best-doner/comments/${some}`,
            providesTags: ['Comments']  // Присвоили тэг запросу
        }),
        postComment: builder.mutation({
            query: comment => ({
                url: '/best-doner/comments',
                method: 'POST',
                body: comment  // Объект, приходящий в body автоматически будет преобразован в JSON формат
            }),
            invalidatesTags: ['Comments'] // После мутации указали на метку, по которой получать актуальные данные 
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url:`/best-doner/comments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comments']
        })
    })
})

export const {
    useGetCommentsQuery,  // автоматически наш ендпоинт getDoners будет преобразован в хук в useGetDonersQuery, содержащий все сущности
    usePostCommentMutation, // ... Mutation
    useDeleteCommentMutation
} = apiSlice