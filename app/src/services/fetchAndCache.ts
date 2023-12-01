import { createAsyncThunk } from "@reduxjs/toolkit";
import { charactersEndpoint } from "../api";
import { ApiRoot } from "../types";

const savedCharactersData = localStorage.getItem("charactersData");

export const charactersData: ApiRoot = savedCharactersData
    ? JSON.parse(savedCharactersData)
    : null;

export const fetchCharacters = async (): Promise<ApiRoot> => {
    const response = await fetch(charactersEndpoint);
    const data: ApiRoot = await response.json();
    return data;
}

export const fetchCharactersData = createAsyncThunk(
    "marvel/fetchCharacters",
    async () => {
        const etag = charactersData?.etag;
        const headers: HeadersInit = etag ? { "If-None-Match": etag } : {};

        try {
            const response = await fetch(charactersEndpoint, { headers });

            if (response.status === 304) {
                console.info(
                    "Data has not been modified, using the cached data"
                );
                return charactersData?.data.results;
            }
            console.info("Data is not cached, making a new API call to the origin.");

            const charactersResponse: ApiRoot = await response.json();
            localStorage.setItem(
                "charactersData",
                JSON.stringify(charactersResponse)
            ); // Persist the characters root endpoint to local storage
            return charactersResponse.data.results; // return the actual characters result
        } catch (error) {
            console.error("Error fetching Marvel data:", error);
            throw error; // Rethrow the error to be caught by the rejection handler
        }
    }
);