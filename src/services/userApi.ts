import { baseApi } from "./baseApi";
import type { IUserData, IUserPublicData } from "../types/userData";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserPublicData: builder.query<IUserPublicData, string>({
            query: (userId: string) => `/user/getdata/${userId}`,
            providesTags: ["Favourite", "UserData"],
        }),
        getUserProfileData: builder.query<IUserData, void>({
            query: () => `/user/profile/getData`,
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `/user/profile/changePassword`,
                method: "PATCH",
                body: data,
            }),
        }),
        changeAvatar: builder.mutation({
            query: (data) => ({
                url: `/user/profile/changeAvatar`,
                method: "PATCH",
                body: data,
            }),
        }),
        setBlogerData: builder.mutation({
            query: (data) => ({
                url: `/user/profile/setBlogerData`,
                method: "PATCH",
                body: data,
            }),
        }),
        updateBlogerDataSingleField: builder.mutation({
            query: (data) => ({
                url: "/user/profile/updateDataField",
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
        }),
        getReviewedRestaurantsList: builder.query<string[], void>({
            query: () => `/user/reviewedRestaurants`,
            providesTags: ["Review"],
        }),
        getFavoriteRestaurantsList: builder.query<string[][], void>({
            query: () => `/user/favoriteRestaurants`,
            providesTags: ["Favourite"],
        }),
        getRatedCommentsList: builder.query<string[], void>({
            query: () => `/user/ratedComments`,
            providesTags: ["UserData"],
        }),
    }),
});

export const {
    useGetUserPublicDataQuery,
    useGetUserProfileDataQuery,
    useChangePasswordMutation,
    useChangeAvatarMutation,
    useSetBlogerDataMutation,
    useUpdateBlogerDataSingleFieldMutation,
    useHandleFavouriteRestaurantsMutation,
    useGetReviewedRestaurantsListQuery,
    useGetFavoriteRestaurantsListQuery,
    useGetRatedCommentsListQuery,
} = userApi;
