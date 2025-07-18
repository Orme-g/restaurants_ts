import { baseApi } from "./baseApi";
import type { IRegisterData, IUserStoreData } from "../types/userData";
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        me: builder.query<IUserStoreData, void>({
            query: () => `/auth/me`,
        }),
        registration: builder.mutation<{ message: string }, IRegisterData>({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
        login: builder.mutation<any, { username: string; password: string }>({
            query: (loginData) => ({
                url: "/auth/login",
                method: "POST",
                body: loginData,
            }),
        }),
        refresh: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: `/auth/refresh`,
                method: "POST",
            }),
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: `/auth/logout`,
                method: "POST",
            }),
        }),
        // Testing endpoints
        loginTest: builder.mutation<string, void>({
            query: () => ({
                url: `/auth/cookie-make`,
                method: "POST",
            }),
        }),
        test: builder.query<any, void>({
            query: () => `/try`,
        }),
        refreshToken: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: `/auth/refresh`,
                method: "POST",
            }),
        }),
        logoutUser: builder.mutation<string, void>({
            query: () => ({
                url: `/auth/logout`,
                method: "POST",
            }),
        }),
        clearAccessToken: builder.mutation<string, void>({
            query: () => ({
                url: "/auth/clearAccessToken",
                method: "POST",
            }),
        }),
    }),
});

export const {
    //Working
    useLazyMeQuery,
    useMeQuery,
    useRegistrationMutation,
    useLoginMutation,
    useLogoutMutation,
    useRefreshMutation,
    //Testing
    useLoginTestMutation,
    useLazyTestQuery,
    useRefreshTokenMutation,
    useLogoutUserMutation,
    useClearAccessTokenMutation,
} = authApi;
