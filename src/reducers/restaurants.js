import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    restaurantData: null,
    pageLoading: 'loading'
}

export const fetchRestaurantData = createAsyncThunk(
    'restaurants/fetchRestaurantData',
    (restId) => {
        const {request} = useHttp()
        return request(`http://localhost:4000/restaurants/${restId}`)
    }
)


const restaurantsSlice = createSlice({
    name: 'restaurants',
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
// eslint-disable-next-line 
const {actions, reducer} = restaurantsSlice
export default reducer