import { createAsyncThunk } from "@reduxjs/toolkit";
import { CharactersRoot, ComicsRoot } from "../types";
import { charactersURL, comicsByCharacterIdURL } from "../api";

export const fetchCharactersData = createAsyncThunk(
    "marvel/fetchCharactersData",
    async () => {
        const charactersData = localStorage.getItem("charactersData");
        const parseCharacters =
            charactersData &&
            ((await JSON.parse(charactersData)) as CharactersRoot);
        if (parseCharacters) {
            console.info("Characters cache found! Checking updates...");
            const etag = parseCharacters.etag;
            const headers: HeadersInit = etag ? { "If-None-Match": etag } : {};
            const response = await fetch(charactersURL, { headers });
            if (response.status === 304) {
                // same etag as origin
                console.info("Cache OK! Characters has not been modified.");
                return parseCharacters.data.results;
            } else {
                console.info("Cache outdated! Fetching updates...");
                const response = await fetch(charactersURL);
                const characters = (await response.json()) as CharactersRoot;
                localStorage.setItem(
                    "charactersData",
                    JSON.stringify(characters)
                );
                return characters.data.results;
            }
        } else {
            console.info("Characters cache not found! Fetching the origin...");
            const response = await fetch(charactersURL);
            const characters = (await response.json()) as CharactersRoot;
            localStorage.setItem("charactersData", JSON.stringify(characters));
            return characters.data.results;
        }
    }
);

export const fetchComicsByCharacterID = createAsyncThunk(
    "marvel/fetchComicsByCharacterID",
    async (characterID?: string) => {
        const comicsData = localStorage.getItem(`comicsData-${characterID}`);
        const parseComics =
            comicsData && ((await JSON.parse(comicsData)) as ComicsRoot);
        if (parseComics) {
            console.info("Comics cache found! Checking updates...");
            const etag = parseComics.etag;
            const headers: HeadersInit = etag ? { "If-None-Match": etag } : {};
            const response = await fetch(comicsByCharacterIdURL(characterID), {
                headers,
            });
            if (response.status === 304) {
                console.info("Cache OK! Comics has not been modified.");
                return parseComics.data.results;
            } else {
                console.info("Cache outdated! Fetching updates...");
                const response = await fetch(
                    comicsByCharacterIdURL(characterID)
                );
                const comics = (await response.json()) as ComicsRoot;
                localStorage.setItem(
                    `comicsData-${characterID}`,
                    JSON.stringify(comics)
                );
                return comics.data.results;
            }
        } else {
            console.info("Comics cache not found! Fetching the origin...");
            if (characterID) {
                const response = await fetch(
                    comicsByCharacterIdURL(characterID)
                );
                const comics =
                    response && ((await response.json()) as ComicsRoot);
                localStorage.setItem(
                    `comicsData-${characterID}`,
                    JSON.stringify(comics)
                );
                return comics.data.results;
            } else {
                console.info("No collection URI provided in the URL");
            }
        }
    }
);
