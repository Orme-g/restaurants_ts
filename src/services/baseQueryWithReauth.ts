import {
    fetchBaseQuery,
    FetchArgs,
    BaseQueryApi,
    FetchBaseQueryError,
    BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { logoutUser } from "../reducers/interactive";
import { currentUrl } from "../../URLs";
type ExtraOptionsWithRetry = { retryAttempted?: boolean };
const createBaseQuery = (baseUrl: string) =>
    fetchBaseQuery({
        baseUrl,
        credentials: "include",
    });
export const createBaseQueryWithReauth =
    (
        baseUrl: string
    ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptionsWithRetry> =>
    async (args, api: BaseQueryApi, extraOptions) => {
        const baseQuery = createBaseQuery(baseUrl);
        const authQuery = createBaseQuery(currentUrl);
        let result = await baseQuery(args, api, extraOptions);
        if (result.error && result.error.status === 401 && !extraOptions?.retryAttempted) {
            const refreshToken = await authQuery({ url: "/auth/refresh", method: "POST" }, api, {
                ...extraOptions,
                retryAttempted: true,
            });
            if ((refreshToken.data as any)?.message === "Token issued") {
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logoutUser());
                await authQuery({ url: "/auth/logout", method: "POST" }, api, extraOptions);
            }
        }
        return result;
    };
