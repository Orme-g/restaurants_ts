import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    restaurantData: [],
    pageLoading: 'loading'
}

export const fetchRestaurantData = createAsyncThunk(
    'restaurantPage/fetchRestaurantData',
    () => {
        const {request} = useHttp()
        return request('http://localhost:3001/restaurants')
    }
)


const restaurantPageSlice = createSlice({
    name: 'restaurantPage',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchRestaurantData.pending, state => {state.pageLoading = 'loading'})
        .addCase(fetchRestaurantData.fulfilled, (state, action) => {
            state.pageLoading = 'idle'
            state.restaurantData = action.payload
        })
        .addCase(fetchRestaurantData.rejected, state => {state.pageLoading = 'error'})
    }
})

const {actions, reducer} = restaurantPageSlice
export default reducer