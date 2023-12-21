import { configureStore, combineReducers } from "@reduxjs/toolkit";
import characterSlice from "./characterSlice";
import comicSlice from "./comicSlice";
import modalSlice from "./modalSlice";

const rootReducer = combineReducers({
    characterSlice,
    comicSlice,
    modalSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
