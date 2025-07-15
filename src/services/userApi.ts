import { baseApi } from "./baseApi";
import type { IUserData } from "../types/userData";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query<IUserData, string>({
            query: (userId: string) => `/user/getdata/${userId}`,
            providesTags: ["Favourite", "UserData"],
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/user/profile`,
                method: "PATCH",
                body: data,
            }),
        }),
        changeAvatar: builder.mutation({
            query: (data) => ({
                url: `/user/changeAvatar`,
                method: "PATCH",
                body: data,
            }),
        }),
        setBlogerData: builder.mutation({
            query: (data) => ({
                url: `/user/setBlogerData`,
                method: "PATCH",
                body: data,
            }),
        }),
        updateBlogerDataSingleField: builder.mutation({
            query: (data) => ({
                url: "/user/update-data-field",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["UserData"],
        }),
        handleFavouriteRestaurants: builder.mutation({
            query: (data) => ({
                url: "/user/handleFavouriteRestaurant",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Favourite"],
            // providesTags: ["Favourite"],
        }),
        getReviewedRestaurantsList: builder.query<string[], void>({
            query: () => `/user/reviewedRestaurants`,
            providesTags: ["Review"],
        }),
        getFavoriteRestaurantsList: builder.query<string[], void>({
            query: () => `/user/favoriteRestaurants`,
            providesTags: ["Favourite"],
        }),
        getRatedCommentsList: builder.query<string[], void>({
            query: () => `/user/ratedComments`,
        }),
    }),
});

export const {
    useGetUserDataQuery,
    useChangePasswordMutation,
    useChangeAvatarMutation,
    useSetBlogerDataMutation,
    useUpdateBlogerDataSingleFieldMutation,
    useHandleFavouriteRestaurantsMutation,
    useGetReviewedRestaurantsListQuery,
    useGetFavoriteRestaurantsListQuery,
    useGetRatedCommentsListQuery,
} = userApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { currentUrl } from "../../URLs.ts";
// import type { IUserData } from "../types/userData";

// export const userApi = createApi({
//     reducerPath: "userApi",
//     baseQuery: fetchBaseQuery({ baseUrl: `${currentUrl}/user` }),
//     tagTypes: ["Review", "Favourite", "UserData"],
//     endpoints: (builder) => ({
//         getUserData: builder.query<IUserData, string>({
//             query: (userId: string) => `/getdata/${userId}`,
//             providesTags: ["Favourite", "UserData"],
//         }),
//         changePassword: builder.mutation({
//             query: (data) => ({
//                 url: `/profile`,
//                 method: "PATCH",
//                 body: data,
//             }),
//         }),
//         changeAvatar: builder.mutation({
//             query: (data) => ({
//                 url: `/changeAvatar`,
//                 method: "PATCH",
//                 body: data,
//             }),
//         }),
//         setBlogerData: builder.mutation({
//             query: (data) => ({
//                 url: `/setBlogerData`,
//                 method: "PATCH",
//                 body: data,
//             }),
//         }),
//         updateBlogerDataSingleField: builder.mutation({
//             query: (data) => ({
//                 url: "/update-data-field",
//                 method: "PATCH",
//                 body: data,
//             }),
//             invalidatesTags: ["UserData"],
//         }),
//         handleFavouriteRestaurants: builder.mutation({
//             query: (data) => ({
//                 url: "/handleFavouriteRestaurant",
//                 method: "PATCH",
//                 body: data,
//             }),
//             invalidatesTags: ["Favourite"],
//             // providesTags: ["Favourite"],
//         }),
//         getReviewedRestaurantsList: builder.query<string[], void>({
//             query: () => `/reviewedRestaurants`,
//             providesTags: ["Review"],
//         }),
//         getFavoriteRestaurantsList: builder.query<string[], void>({
//             query: () => `/favoriteRestaurants`,
//             providesTags: ["Favourite"],
//         }),
//         getRatedCommentsList: builder.query<string[], void>({
//             query: () => `/ratedComments`,
//         }),
//     }),
// });

// export const {
//     useGetUserDataQuery,
//     useChangePasswordMutation,
//     useChangeAvatarMutation,
//     useSetBlogerDataMutation,
//     useUpdateBlogerDataSingleFieldMutation,
//     useHandleFavouriteRestaurantsMutation,
//     useGetReviewedRestaurantsListQuery,
//     useGetFavoriteRestaurantsListQuery,
//     useGetRatedCommentsListQuery,
// } = userApi;
