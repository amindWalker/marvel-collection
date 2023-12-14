export interface CharactersRoot {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: CharacterData;
}

export interface CharacterData {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
}

export interface Character {
    id: number;
    name: string;
    description?: string;
    modified?: string;
    thumbnail?: CharacterThumbnail;
    resourceURI?: string;
    comics?: CharactersCollection;
    series?: CharactersCollection;
    stories?: CollectionWithType[];
    events?: CharactersCollection;
    urls?: CharacterUrl[];
}

export interface CharacterThumbnail {
    path: string;
    extension: string;
}

export interface CharactersCollection {
    available: number;
    collectionURI: string;
    items: CharacterItem[];
    returned: number;
}

export interface CollectionWithType extends CharactersCollection {
    items: CharacterItemWithType[];
}

export interface CharacterItem {
    resourceURI: string;
    name: string;
}

export interface CharacterItemWithType extends CharacterItem {
    type: string;
}

export interface CharacterUrl {
    type: string;
    url: string;
}