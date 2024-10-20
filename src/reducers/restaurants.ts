import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

import type { IRestaurant } from "../types/restaurantsTypes";
import type { IReview } from "../types/reviewsTypes";

interface IInitialState {
    lastAddedRestaurants: null | IRestaurant[];
    restaurantData: IRestaurant | null;
    restaurantReviews: IReview[] | null;
    pageLoading: "loading" | "error" | "idle";
    serverReply: "Sending" | "Failed" | "Success" | null;
}

const initialState: IInitialState = {
    lastAddedRestaurants: null,
    restaurantData: null,
    restaurantReviews: null,
    pageLoading: "loading",
    serverReply: null,
};

export const fetchLastAddedRestaurants = createAsyncThunk(
    "restaurants/fetchLastAddedRestaurants",
    () => {
        const { request } = useHttp();
        return request("http://localhost:4000/restaurants");
    }
);

export const fetchRestaurantData = createAsyncThunk(
    "restaurants/fetchRestaurantData",
    (restId: string) => {
        const { request } = useHttp();
        return request(`http://localhost:4000/restaurants/${restId}`);
    }
);

export const fetchRestaurantReviews = createAsyncThunk(
    "restaurants/fetchRestaurantReviews",
    (restId: string) => {
        const { request } = useHttp();
        return request(`http://localhost:4000/reviews/${restId}`);
    }
);

export const addNewRestaurant = createAsyncThunk(
    "restaurants/addNewRestaurant",
    (restData: string) => {
        const { request } = useHttp();
        return request("http://localhost:4000/restaurants/add", "POST", restData);
    }
);

export const addAdditionalReview = createAsyncThunk(
    "restaurants/addAdditionalReview",
    (reviewData: string) => {
        const { request } = useHttp();
        return request("http://localhost:4000/reviews/addAdditional", "PATCH", reviewData);
    }
);

const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
            // Restaurant Data
            .addCase(fetchRestaurantData.pending, (state) => {
                state.pageLoading = "loading";
            })
            .addCase(fetchRestaurantData.fulfilled, (state, action) => {
                state.pageLoading = "idle";
                state.restaurantData = action.payload;
            })
            .addCase(fetchRestaurantData.rejected, (state) => {
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
            .addCase(addNewRestaurant.fulfilled, (state, action) => {
                state.serverReply = action.payload;
            })
            .addCase(addNewRestaurant.rejected, (state) => {
                state.serverReply = "Failed";
            });
    },
});
// eslint-disable-next-line
const { actions, reducer } = restaurantsSlice;
export default reducer;
