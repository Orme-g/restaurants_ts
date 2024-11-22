import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
    IRestaurant,
    TSortRestaurants,
    IFindRestaurantCriterias,
} from "../types/restaurantsTypes";
import type { IUserData } from "../types/userData";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    tagTypes: ["Review", "Favourite", "UserData"],
    endpoints: (builder) => ({
        getSortedRestaurants: builder.query<IRestaurant[], string>({
            query: (sort: TSortRestaurants) => `/sorted-restaurants/${sort}`,
        }),
        findRestaurant: builder.mutation({
            query: (criterias: IFindRestaurantCriterias) => ({
                url: "/find-restaurant/selection",
                method: "POST",
                body: criterias,
            }),
        }),
        searchRestaurant: builder.query({
            query: (input: string) => `/search-restaurant/${input}`,
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
        getUserData: builder.query<IUserData, string>({
            query: (userId: string) => `/user/getdata/${userId}`,
            providesTags: ["Favourite", "UserData"],
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/profile`,
                method: "PATCH",
                body: data,
            }),
        }),
        changeAvatar: builder.mutation({
            query: (data) => ({
                url: `/changeAvatar`,
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
        getReviewedRestaurantsList: builder.query<string[], string>({
            query: (userId: string) => `/reviewedRestaurants/${userId}`,
            providesTags: ["Review"],
        }),
        addReviewedRestaurantToUser: builder.mutation({
            query: (data) => ({
                url: "/addReviewedRestaurant",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Review"],
        }),
        handleFavouriteRestaurants: builder.mutation({
            query: (data) => ({
                url: "/handleFavouriteRestaurant",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Favourite"],
        }),
        // getFavouriteRestNames: builder.query({
        //     query: (userId) => ({
        //         url: `/get-favourite-restaurants-names/${userId}`,
        //     }),
        // }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useGetUserDataQuery,
    useGetSortedRestaurantsQuery,
    useFindRestaurantMutation,
    useSearchRestaurantQuery,
    useChangePasswordMutation,
    useGetReviewedRestaurantsListQuery,
    useAddReviewedRestaurantToUserMutation,
    useChangeAvatarMutation,
    useSetBlogerDataMutation,
    useUpdateBlogerDataSingleFieldMutation,
    useHandleFavouriteRestaurantsMutation,
    // useGetFavouriteRestNamesQuery,
} = apiSlice;
