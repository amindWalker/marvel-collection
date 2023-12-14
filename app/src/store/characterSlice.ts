import { createSlice } from "@reduxjs/toolkit";
import { Character, Status } from "../types";
import { fetchCharactersData } from "../services/fetchOrigin";
import { RootState } from ".";
import { ErrorResponse } from "react-router-dom";

export interface CharacterState {
    characters: Character[];
    status: Status;
    error?: ErrorResponse | string;
}

const initialState: CharacterState = {
    characters: [],
    status: Status.Loading,
};

const characterSlice = createSlice({
    name: "marvel/Characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharactersData.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(
                fetchCharactersData.fulfilled,
                (state, action) => {
                    state.characters = action.payload as Character[];
                    state.status = Status.Idle;
                }
            )
            .addCase(fetchCharactersData.rejected, (state, action) => {
                state.status = Status.Failed;
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export const selectCharacters = (state: RootState) => {
    return state.characterSlice;
};

export default characterSlice.reducer;
