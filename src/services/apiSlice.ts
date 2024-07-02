import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IRestaurant, TSortRestaurants, IFindRestaurantCriterias } from "../types/restaurantsTypes";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
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
        getReviewedRestaurantsList: builder.query<string[], string>({
            query: (userId: string) => `/reviewedRestaurants/${userId}`,
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useGetSortedRestaurantsQuery,
    useFindRestaurantMutation,
    useChangePasswordMutation,
} = apiSlice;
