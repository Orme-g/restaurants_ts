import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../Components/counter/counterSlice';
import restoReducer from '../reducers/restoApp'


export const store = configureStore({
  reducer: {
    restoReducer
  },
  devTools: true
});
