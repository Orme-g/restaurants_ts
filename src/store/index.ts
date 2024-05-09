import { configureStore } from "@reduxjs/toolkit";
import interactive from "../reducers/interactive";
import restaurants from "../reducers/restaurants";
import { apiSlice } from "../services/apiSlice";

const store = configureStore({
    reducer: {
        interactive,
        restaurants,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
