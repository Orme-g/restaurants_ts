import { baseApi } from "./baseApi";
import type { IDonerRestaurant, INewDonerArticle } from "../types/donersTypes";

export const donersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDonersList: builder.query<IDonerRestaurant[], null>({
            query: () => "/best-doner/getAllDonersList",
        }),
        getSingleDonerRestaurant: builder.query<IDonerRestaurant, string>({
            query: (id: string) => `/best-doner/${id}`,
        }),
        addDonerArticle: builder.mutation({
            query: (data: INewDonerArticle) => ({
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

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { currentUrl } from "../../URLs";

// import type { IDonerRestaurant, INewDonerArticle } from "../types/donersTypes";

// export const donersApi = createApi({
//     reducerPath: "donersApi",
//     baseQuery: fetchBaseQuery({ baseUrl: `${currentUrl}/best-doner` }),
//     tagTypes: [],
//     endpoints: (builder) => ({
//         getDonersList: builder.query<IDonerRestaurant[], null>({
//             query: () => "/",
//         }),
//         getSingleDonerRestaurant: builder.query<IDonerRestaurant, string>({
//             query: (id: string) => `/${id}`,
//         }),
//         addDonerArticle: builder.mutation({
//             query: (data: INewDonerArticle) => ({
//                 url: "/add",
//                 method: "POST",
//                 body: data,
//             }),
//         }),
//     }),
// });

// export const {
//     useGetDonersListQuery,
//     useGetSingleDonerRestaurantQuery,
//     useAddDonerArticleMutation,
// } = donersApi;
