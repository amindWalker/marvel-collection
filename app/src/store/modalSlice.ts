import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface ModalState {
    isOpen: boolean;
    characterID?: number;
}

const initialState: ModalState = {
    isOpen: false,
    characterID: undefined,
};

export const modalSlice = createSlice({
    name: "marvel/Modal",
    initialState,
    reducers: {
        modalOpen: (state, action) => {
            state.characterID = action.payload;
            state.isOpen = true;
        },
        modalClose: (state) => {
            state.isOpen = false;
            state.characterID = undefined;
        },
    },
});

export function selectModal(state: RootState) {
    return state.modalSlice
}

export const { modalOpen, modalClose } = modalSlice.actions;
export default modalSlice.reducer;
