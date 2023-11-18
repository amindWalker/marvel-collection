import { Character } from "../../interfaces/characters";

export enum Status {
    Idle = "idle",
    Loading = "loading",
    Succeeded = "succeeded",
    Failed = "failed",
}

export interface MarvelState {
    characters: Character[];
    etag: string | null;
    status: Status;
    error: string | null;
}