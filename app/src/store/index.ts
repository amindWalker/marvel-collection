import { combineReducers, configureStore } from "@reduxjs/toolkit";
import characterSlice from "./characterSlice";

const rootReducer = combineReducers({
    characterSlice,
    // TODO comicSlice
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
