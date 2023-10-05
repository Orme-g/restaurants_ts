import { configureStore } from '@reduxjs/toolkit';
import interactive from '../reducers/interactive'
import restaurants from '../reducers/restaurants'
import doners from '../reducers/doners'


const store = configureStore({
  reducer: {
    interactive,
    restaurants,
    doners
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default store