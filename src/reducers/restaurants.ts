import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";
import { currentUrl } from "../../URLs";

import type { IRestaurant } from "../types/restaurantsTypes";
import type { IReview } from "../types/reviewsTypes";

interface IInitialState {
    lastAddedRestaurants: null | IRestaurant[];
    restaurantData: IRestaurant | null;
    restaurantReviews: IReview[] | null;
    pageLoading: "loading" | "error" | "idle";
    serverReply: "success" | "error" | "Failed" | "Sending" | null;
}

const initialState: IInitialState = {
    lastAddedRestaurants: null,
    restaurantData: null,
    restaurantReviews: null,
    pageLoading: "loading",
    serverReply: null,
};

export const fetchLastAddedRestaurants = createAsyncThunk<IRestaurant[], undefined>(
    "restaurants/fetchLastAddedRestaurants",
    () => {
        const { request } = useHttp();
        return request(`${currentUrl}/restaurants`);
    }
);
export const fetchRestaurantReviews = createAsyncThunk<IReview[], string>(
    "restaurants/fetchRestaurantReviews",
    (restId) => {
        const { request } = useHttp();
        return request(`${currentUrl}/reviews/${restId}`);
    }
);

export const addNewRestaurant = createAsyncThunk<{ message: "success" | "error" }, FormData>(
    "restaurants/addNewRestaurant",
    (restData) => {
        const { request } = useHttp();
        return request(`${currentUrl}/restaurants/add`, "POST", restData, {});
    }
);

export const addAdditionalReview = createAsyncThunk(
    "restaurants/addAdditionalReview",
    (reviewData: string) => {
        const { request } = useHttp();
        return request(`${currentUrl}/reviews/addAdditional`, "PATCH", reviewData);
    }
);

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Extra reducers dont require action: PayloadAction<> typization. Types coming from CreateAsyncThunk
        builder
            //Last added restaurants
            .addCase(fetchLastAddedRestaurants.pending, (state) => {
                state.pageLoading = "loading";
            })
            .addCase(fetchLastAddedRestaurants.fulfilled, (state, action) => {
                state.pageLoading = "idle";
                state.lastAddedRestaurants = action.payload;
            })
            .addCase(fetchLastAddedRestaurants.rejected, (state) => {
                state.pageLoading = "error";
            })
            // Get Restaurant Reviews
            .addCase(fetchRestaurantReviews.pending, (state) => {
                state.pageLoading = "loading";
            })
            .addCase(fetchRestaurantReviews.fulfilled, (state, action) => {
                state.pageLoading = "idle";
                state.restaurantReviews = action.payload;
            })
            .addCase(fetchRestaurantReviews.rejected, (state) => {
                state.pageLoading = "error";
            })
            // Add New Restaurant
            .addCase(addNewRestaurant.pending, (state) => {
                state.serverReply = "Sending";
            })
            .addCase(
                addNewRestaurant.fulfilled,
                (state, action: PayloadAction<{ message: "success" | "error" }>) => {
                    state.serverReply = action.payload.message;
                }
            )
            .addCase(addNewRestaurant.rejected, (state) => {
                state.serverReply = "Failed";
            });
    },
});
// eslint-disable-next-line
const { actions, reducer } = restaurantsSlice;
export default reducer;
