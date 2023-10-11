import { configureStore } from '@reduxjs/toolkit';
import interactive from '../reducers/interactive'
import restaurants from '../reducers/restaurants'
import doners from '../reducers/doners'
import { apiSlice } from '../Components/RTQ/apiSlice';


const store = configureStore({
  reducer: {
    interactive,
    restaurants,
    doners,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});


export default store