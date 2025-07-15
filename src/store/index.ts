import { configureStore } from "@reduxjs/toolkit";
import interactive from "../reducers/interactive";
import restaurants from "../reducers/restaurants";
import { restaurantsApi } from "../services/restaurantsApi";
import { userApi } from "../services/userApi";
import { donersApi } from "../services/donersApi";
import { commentsApi } from "../services/commentsApi";
import { eventsApi } from "../services/eventsApi";
import { blogApi } from "../services/blogApi";
import { authApi } from "../services/authApi";

const store = configureStore({
    reducer: {
        interactive,
        restaurants,
        [restaurantsApi.reducerPath]: restaurantsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [donersApi.reducerPath]: donersApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [eventsApi.reducerPath]: eventsApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            restaurantsApi.middleware,
            userApi.middleware,
            donersApi.middleware,
            commentsApi.middleware,
            eventsApi.middleware,
            blogApi.middleware,
            authApi.middleware
        ),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
