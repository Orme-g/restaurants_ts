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
        addDonerArticle: builder.mutation<{ message: string }, INewDonerArticle>({
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
