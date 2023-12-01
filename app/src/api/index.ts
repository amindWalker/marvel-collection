const MARVEL_BASE_URL = import.meta.env.VITE_MARVEL_BASE_URL;
const MARVEL_PBK = import.meta.env.VITE_MARVEL_PBK;
const MARVEL_API_HASH = import.meta.env.VITE_MARVEL_API_HASH;

const limit = 100;
const offset = 0;

export const charactersEndpoint =
    `${MARVEL_BASE_URL}/v1/public/characters?limit=${limit}&offset=${offset}&ts=9&apikey=${MARVEL_PBK}&hash=${MARVEL_API_HASH}`;

export const comicsEndpoint =
    `${MARVEL_BASE_URL}/v1/public/comics?limit=${limit}&offset=${offset}&ts=9&apikey=${MARVEL_PBK}&hash=${MARVEL_API_HASH}`;
