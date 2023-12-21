import { createSlice } from "@reduxjs/toolkit";
import { Comic, Status } from "../types";
import { fetchComicsByCharacterID } from "../services/fetchOrigin";
import { RootState } from ".";
import { ErrorResponse } from "react-router-dom";

export interface ComicState {
    comics: Comic[];
    status: Status;
    error?: ErrorResponse | string;
}

const initialState: ComicState = {
    comics: [],
    status: Status.Loading,
};

const comicSlice = createSlice({
    name: "marvel/Comics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComicsByCharacterID.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(
                fetchComicsByCharacterID.fulfilled,
                (state, action) => {
                    state.comics = action.payload as Comic[];
                    state.status = Status.Idle;
                }
            )
            .addCase(fetchComicsByCharacterID.rejected, (state, action) => {
                state.status = Status.Failed;
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export const selectComics = (state: RootState) => {
    return state.comicSlice;
};

export default comicSlice.reducer;
