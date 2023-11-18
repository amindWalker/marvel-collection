import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';

export const store = configureStore({
  reducer: {
    marvel: characterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
