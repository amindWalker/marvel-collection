import { Character } from "../../interfaces/characters";

export enum Status {
    Idle = "idle",
    Loading = "loading",
    Succeeded = "succeeded",
    Failed = "failed",
}

export interface CharacterState {
    characters: Character[];
    status: Status;
    error: string | null;
}