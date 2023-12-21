export const MARVEL_BASE_URL = import.meta.env.VITE_MARVEL_BASE_URL;
export const MARVEL_PBK = import.meta.env.VITE_MARVEL_PBK;
export const MARVEL_API_HASH = import.meta.env.VITE_MARVEL_API_HASH;

export const limit = 100;
export const offset = 0;

export const charactersURL = `${MARVEL_BASE_URL}/v1/public/characters?limit=${limit}&offset=${offset}&ts=9&apikey=${MARVEL_PBK}&hash=${MARVEL_API_HASH}`;
export const comicsURL = `${MARVEL_BASE_URL}/v1/public/comics?limit=${limit}&offset=${offset}&ts=9&apikey=${MARVEL_PBK}&hash=${MARVEL_API_HASH}`;

export function comicsByCharacterIdURL(characterID?: string) {
    return `${MARVEL_BASE_URL}/v1/public/characters/${characterID}/comics?limit=${limit}&ts=9&apikey=${MARVEL_PBK}&hash=${MARVEL_API_HASH}`;
}
