import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { charactersData, fetchCharacterData } from "../services/api";
import { CharacterState, Status } from "./interfaces/characterState";
import { Character } from "../interfaces/characters";

const initialState: CharacterState = {
    characters: charactersData ? charactersData.data.results : [],
    status: Status.Idle,
    error: null,
};

const characterSlice = createSlice({
    name: "marvel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacterData.pending, (state) => {
                state.status = Status.Loading;
            })
            .addCase(
                fetchCharacterData.fulfilled,
                (state, action: PayloadAction<Character[]>) => {
                    state.status = Status.Succeeded;
                    state.characters = action.payload;
                }
            )
            .addCase(fetchCharacterData.rejected, (state, action) => {
                state.status = Status.Failed;
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export default characterSlice.reducer;
