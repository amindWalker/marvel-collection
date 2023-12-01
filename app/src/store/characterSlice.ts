import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../types";
import { RootState } from ".";
import { fetchCharactersData } from "../services/fetchAndCache";

export enum Status {
    Idle = "idle",
    Loading = "loading",
    Failed = "failed",
}

export interface CharacterState {
    characters: Character[];
    status: Status;
    error?: string | null;
}

const initialState: CharacterState = {
    characters: [],
    status: Status.Loading,
};

const characterSlice = createSlice({
    name: "marvel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharactersData.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(
                fetchCharactersData.fulfilled,
                (state, action: PayloadAction<Character[]>) => {
                    state.characters = action.payload;
                    state.status = Status.Idle;
                }
            )
            .addCase(fetchCharactersData.rejected, (state, action) => {
                state.status = Status.Failed;
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export const selectCharacters = (state: RootState) => state.characterSlice;
// TODO export const selectComics = (state: RootState) => state.comicSlice;

export default characterSlice.reducer;
