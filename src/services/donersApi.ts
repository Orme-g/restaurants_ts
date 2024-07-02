import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IDonerRestaurant } from "../types/donersTypes";

export const donersApi = createApi({
    reducerPath: "donersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    tagTypes: [],
    endpoints: (builder) => ({
        getDonersList: builder.query<IDonerRestaurant[], null>({
            query: () => "/best-doner",
        }),
        getSingleDonerRestaurant: builder.query<IDonerRestaurant, string>({
            query: (id: string) => `/best-doner/${id}`,
        }),
        addDonerArticle: builder.mutation({
            query: (data) => ({
                url: "/best-doner/add",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetDonersListQuery,
    useGetSingleDonerRestaurantQuery,
    useAddDonerArticleMutation,
} = donersApi;
