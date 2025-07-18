import { baseApi } from "./baseApi.ts";
import type {
    IRestaurant,
    TSortRestaurants,
    IFindRestaurantCriterias,
    IReview,
    INewReview,
    IAddidionalReview,
} from "../types/restaurantsTypes.ts";

export const restaurantsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLastAddedRestaurants: builder.query<IRestaurant[], number>({
            query: (limit) => ({
                url: `/restaurants/getLastAddedRestaurants`,
                params: { limit },
            }),
        }),
        getSortedRestaurants: builder.query<
            IRestaurant[],
            { sortType: TSortRestaurants; cardsNumber: number }
        >({
            query: ({ sortType, cardsNumber }) => ({
                url: `/sorted-restaurants/${sortType}`,
                params: { cardsNumber },
            }),
        }),
        addNewRestaurant: builder.mutation<{ message: string }, FormData>({
            query: (data) => ({
                url: `/restaurants/addNewRestaurant`,
                method: "POST",
                body: data,
            }),
        }),
        findRestaurant: builder.mutation<IRestaurant[] | null, IFindRestaurantCriterias>({
            query: (criterias) => ({
                url: "/find-restaurant/selection",
                method: "POST",
                body: criterias,
            }),
        }),
        getRestaurantById: builder.query<IRestaurant, string>({
            query: (restId) => `/restaurants/${restId}`,
        }),
        searchRestaurant: builder.query<{ name: string; _id: string }[] | [], string>({
            query: (input) => `/search-restaurant/${input}`,
        }),
        getRestaurantReviews: builder.query<IReview[], string>({
            query: (restId) => `/restaurant/reviews/${restId}`,
            providesTags: ["Review"],
        }),
        postRestaurantReview: builder.mutation<{ message: string }, INewReview>({
            query: (newReviewData) => ({
                url: `/restaurant/reviews/postReview`,
                method: "POST",
                body: newReviewData,
            }),
            invalidatesTags: ["Review"],
        }),
        addAdditionalReview: builder.mutation<{ message: string }, IAddidionalReview>({
            query: (data) => ({
                url: `/restaurant/reviews/addAdditional`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});

export const {
    useGetLastAddedRestaurantsQuery,
    useGetSortedRestaurantsQuery,
    useAddNewRestaurantMutation,
    useFindRestaurantMutation,
    useGetRestaurantByIdQuery,
    useSearchRestaurantQuery,
    useGetRestaurantReviewsQuery,
    usePostRestaurantReviewMutation,
    useAddAdditionalReviewMutation,
} = restaurantsApi;
