import { configureStore } from '@reduxjs/toolkit';
import interactive from '../reducers/interactive'
import restaurantPage from '../reducers/restaurantPage'


const store = configureStore({
  reducer: {
    interactive,
    restaurantPage
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default store