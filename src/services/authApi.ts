import { createApi } from "@reduxjs/toolkit/query/react";
import { currentUrl } from "../../URLs";
import type { IRegisterData } from "../types/userData";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: createBaseQueryWithReauth(`${currentUrl}/auth`),
    endpoints: (builder) => ({
        registration: builder.mutation<{ message: string }, IRegisterData>({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),
        login: builder.mutation<any, { username: string; password: string }>({
            query: (loginData) => ({
                url: "/login",
                method: "POST",
                body: loginData,
            }),
        }),
        refresh: builder.mutation<any, void>({
            query: () => ({
                url: `/refresh`,
                method: "POST",
            }),
        }),
        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: `/logout`,
                method: "POST",
            }),
        }),
        // Testing endpoints
        loginTest: builder.mutation<string, void>({
            query: () => ({
                url: `/cookie-make`,
                method: "POST",
            }),
        }),
        test: builder.query<any, void>({
            query: () => `/try`,
        }),
        refreshToken: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: `/refresh`,
                method: "POST",
            }),
        }),
        logoutUser: builder.mutation<string, void>({
            query: () => ({
                url: `/logout`,
                method: "POST",
            }),
        }),
        clearAccessToken: builder.mutation<string, void>({
            query: () => ({
                url: "/clearAccessToken",
                method: "POST",
            }),
        }),
    }),
});

export const {
    //Working
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
