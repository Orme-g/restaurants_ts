import { createApi } from "@reduxjs/toolkit/query/react";
import { currentUrl } from "../../URLs";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: createBaseQueryWithReauth(`${currentUrl}`),
    tagTypes: ["Review", "Favourite", "UserData", "PostData", "Comments", "Profile"],
    endpoints: () => ({}),
});
