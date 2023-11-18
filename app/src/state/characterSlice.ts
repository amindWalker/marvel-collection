import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../interfaces/characters";
import { fetchCharacterData } from "../services/api";
import { MarvelState, Status } from "./interfaces/marvelState";

const initialState: MarvelState = {
    characters: [],
    status: Status.Idle,
    error: null,
    etag: null,
};

type CharacterPayloadAction = PayloadAction<
    Character[] | { characters: Character[]; etag: string | null }
>;

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
                (state, action: CharacterPayloadAction) => {
                    state.status = Status.Succeeded;
                    // TODO: remove this check after defining the proper data structure
                    if (Array.isArray(action.payload)) {
                        // If the payload is an array, set the characters directly
                        state.characters = action.payload;
                    } else {
                        // If the payload is an object, extract characters and etag
                        state.characters = action.payload.characters;
                        state.etag = action.payload.etag;
                    }
                }
            )
            .addCase(fetchCharacterData.rejected, (state, action) => {
                state.status = Status.Failed;
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export default characterSlice.reducer;
