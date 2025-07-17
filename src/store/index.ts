import { configureStore } from "@reduxjs/toolkit";
import interactive from "../reducers/interactive";
import { baseApi } from "../services/baseApi";

const store = configureStore({
    reducer: {
        interactive,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
