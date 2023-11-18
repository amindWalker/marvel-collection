import { combineReducers } from "@reduxjs/toolkit";
import marvelReducer from "./characterSlice";

const combinedReducer = combineReducers({
    marvel: marvelReducer,
    // TODO: add comics and more later
});

export type CombinedState = ReturnType<typeof combinedReducer>;
