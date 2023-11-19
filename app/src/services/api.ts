import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiRoot } from "../interfaces/characters";

const MARVEL_BASE_URL: string = import.meta.env.VITE_MARVEL_BASE_URL;
const MARVEL_PBK: string = import.meta.env.VITE_MARVEL_PBK;
const MARVEL_API_HASH: string = import.meta.env.VITE_MARVEL_API_HASH;

const savedCharactersData = localStorage.getItem("charactersData");
export const charactersData: ApiRoot = savedCharactersData
    ? JSON.parse(savedCharactersData)
    : null;

export const fetchCharacterData = createAsyncThunk(
    "marvel/fetchCharacters",
    async () => {
        const etag = charactersData?.etag;
        const headers: HeadersInit = etag ? { "If-None-Match": etag } : {};

        const limit = 100;
        const offset = 0;
        const charactersEndpoint = `${MARVEL_BASE_URL}/v1/public/characters?limit=${limit}&offset=${offset}&ts=9&apikey=${MARVEL_PBK}&hash=${MARVEL_API_HASH}`;
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
