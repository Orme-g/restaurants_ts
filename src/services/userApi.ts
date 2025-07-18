import { baseApi } from "./baseApi";
import type { IUserData, IUserPublicData, IBlogData, IStartBlogData } from "../types/userData";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserPublicData: builder.query<IUserPublicData, string>({
            query: (userId: string) => `/user/getdata/${userId}`,
            providesTags: ["Favourite", "UserData"],
        }),
        getUserBlogPublicData: builder.query<IBlogData, string>({
            query: (userId) => `/user/blogData/${userId}`,
        }),
        getUserProfileData: builder.query<IUserData, void>({
            query: () => `/user/profile/getData`,
            providesTags: ["Profile"],
        }),
        changePassword: builder.mutation<{ message: string }, { oldPass: string; newPass: string }>(
            {
                query: (data) => ({
                    url: `/user/profile/changePassword`,
                    method: "PATCH",
                    body: data,
                }),
            }
        ),
        changeAvatar: builder.mutation<{ message: string }, { avatarData: string }>({
            query: (data) => ({
                url: `/user/profile/changeAvatar`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),
        setBlogerData: builder.mutation<{ message: string }, IStartBlogData>({
            query: (data) => ({
                url: `/user/profile/setBlogerData`,
                method: "PATCH",
                body: data,
            }),
        }),
        updateBlogerDataSingleField: builder.mutation<
            { message: string },
            { field: "aboutMe" | "blogCity"; data: string }
        >({
            query: (data) => ({
                url: "/user/profile/updateDataField",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Profile"],
        }),
        handleFavouriteRestaurants: builder.mutation<
            { message: string },
            { restId: string; type: "remove" | "add"; name: string }
        >({
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
        getRatedBlogPostsList: builder.query<string[], void>({
            query: () => `/user/ratedBlogPosts`,
            providesTags: ["PostData"],
        }),
    }),
});

export const {
    useGetUserPublicDataQuery,
    useGetUserBlogPublicDataQuery,
    useGetUserProfileDataQuery,
    useChangePasswordMutation,
    useChangeAvatarMutation,
    useSetBlogerDataMutation,
    useUpdateBlogerDataSingleFieldMutation,
    useHandleFavouriteRestaurantsMutation,
    useGetReviewedRestaurantsListQuery,
    useGetFavoriteRestaurantsListQuery,
    useGetRatedCommentsListQuery,
    useGetRatedBlogPostsListQuery,
} = userApi;
