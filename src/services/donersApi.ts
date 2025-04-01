import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverHost, serverPort } from "../../URLs";

import type { IDonerRestaurant, INewDonerArticle } from "../types/donersTypes";

export const donersApi = createApi({
    reducerPath: "donersApi",
    baseQuery: fetchBaseQuery({ baseUrl: `http://${serverHost}:${serverPort}/best-doner` }),
    tagTypes: [],
    endpoints: (builder) => ({
        getDonersList: builder.query<IDonerRestaurant[], null>({
            query: () => "/",
        }),
        getSingleDonerRestaurant: builder.query<IDonerRestaurant, string>({
            query: (id: string) => `/${id}`,
        }),
        addDonerArticle: builder.mutation({
            query: (data: INewDonerArticle) => ({
                url: "/add",
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
