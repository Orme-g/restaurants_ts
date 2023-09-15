import { configureStore } from '@reduxjs/toolkit';
import restoReducer from '../reducers/restoApp'


const store = configureStore({
  reducer: {
    restoReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export default store