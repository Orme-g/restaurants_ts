// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { currentUrl } from "../../URLs.ts";
import { baseApi } from "./baseApi.ts";
import type {
    IRestaurant,
    TSortRestaurants,
    IFindRestaurantCriterias,
} from "../types/restaurantsTypes.ts";

export const restaurantsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSortedRestaurants: builder.query<
            IRestaurant[],
            { sortType: TSortRestaurants; cardsNumber: number }
        >({
            query: ({ sortType, cardsNumber }) => ({
                url: `/sorted-restaurants/${sortType}`,
                params: { cardsNumber },
            }),
        }),
        findRestaurant: builder.mutation({
            query: (criterias: IFindRestaurantCriterias) => ({
                url: "/find-restaurant/selection",
                method: "POST",
                body: criterias,
            }),
        }),
        getRestaurantById: builder.query<IRestaurant, string>({
            query: (restId) => `/restaurants/${restId}`,
        }),
        searchRestaurant: builder.query({
            query: (input: string) => `/search-restaurant/${input}`,
        }),
    }),
});

export const {
    useGetSortedRestaurantsQuery,
    useFindRestaurantMutation,
    useGetRestaurantByIdQuery,
    useSearchRestaurantQuery,
} = restaurantsApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { currentUrl } from "../../URLs.ts";
// import type {
//     IRestaurant,
//     TSortRestaurants,
//     IFindRestaurantCriterias,
// } from "../types/restaurantsTypes.ts";

// export const restaurantsApi = createApi({
//     reducerPath: "restaurantsApi",
//     baseQuery: fetchBaseQuery({ baseUrl: `${currentUrl}` }),
//     tagTypes: ["Review", "Favourite", "UserData"],
//     endpoints: (builder) => ({
//         getSortedRestaurants: builder.query<
//             IRestaurant[],
//             { sortType: TSortRestaurants; cardsNumber: number }
//         >({
//             query: ({ sortType, cardsNumber }) => ({
//                 url: `/sorted-restaurants/${sortType}`,
//                 params: { cardsNumber },
//             }),
//         }),
//         findRestaurant: builder.mutation({
//             query: (criterias: IFindRestaurantCriterias) => ({
//                 url: "/find-restaurant/selection",
//                 method: "POST",
//                 body: criterias,
//             }),
//         }),
//         getRestaurantById: builder.query<IRestaurant, string>({
//             query: (restId) => `/restaurants/${restId}`,
//         }),
//         searchRestaurant: builder.query({
//             query: (input: string) => `/search-restaurant/${input}`,
//         }),
//     }),
// });

// export const {
//     useGetSortedRestaurantsQuery,
//     useFindRestaurantMutation,
//     useGetRestaurantByIdQuery,
//     useSearchRestaurantQuery,
// } = restaurantsApi;
