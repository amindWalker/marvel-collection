import { createAsyncThunk } from "@reduxjs/toolkit";
import { CombinedState } from "../state/combinedReducers";
import { ApiRoot } from "../interfaces/characters";

const MARVEL_BASE_URL: string = import.meta.env.VITE_MARVEL_BASE_URL;
const MARVEL_PBK: string = import.meta.env.VITE_MARVEL_PBK;
const MARVEL_API_HASH: string = import.meta.env.VITE_MARVEL_API_HASH;

export const fetchCharacterData = createAsyncThunk(
    'marvel/fetchData',
    async (_, { getState }) => {
      const state = getState() as CombinedState;
      const headers: HeadersInit = state.marvel.etag
        ? { 'If-None-Match': state.marvel.etag }
        : {};

      const limit = 100;
      const offset = 0;
      const endpoint = `${MARVEL_BASE_URL}/v1/public/characters?limit=${limit}&offset=${offset}&ts=9&apikey=${MARVEL_PBK}&hash=${MARVEL_API_HASH}`;
      try {
        const response = await fetch(endpoint, { headers });

        if (response.status === 304) {
          // Data has not been modified; use the cached data
          return state.marvel.characters;
        }

        const etag = response.headers.get('etag');
        const marvelApi: ApiRoot = await response.json();

        return { characters: marvelApi.data.results, etag };
      } catch (error) {
        console.error('Error fetching Marvel data:', error);
        throw error; // Rethrow the error to be caught by the rejection handler
      }
    }
  );