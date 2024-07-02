import { configureStore } from "@reduxjs/toolkit";
import interactive from "../reducers/interactive";
import restaurants from "../reducers/restaurants";
import { apiSlice } from "../services/apiSlice";
import { donersApi } from "../services/donersApi";
import { commentsApi } from "../services/commentsApi";

const store = configureStore({
    reducer: {
        interactive,
        restaurants,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [donersApi.reducerPath]: donersApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            donersApi.middleware,
            commentsApi.middleware
        ),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
