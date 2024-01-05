import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface OffsetState {
    offset: number;
}

const initialState: OffsetState = {
    offset: 0,
};

export const offsetSlice = createSlice({
    name: "marvel/Offset",
    initialState,
    reducers: {
        setOffset: (state, action) => {
            state.offset = action.payload;
        },
    },
});

export function selectOffset(state: RootState) {
    return state.offsetSlice;
}

export const { setOffset } = offsetSlice.actions;
export default offsetSlice.reducer;
