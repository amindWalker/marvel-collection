export interface ApiRoot {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: Data;
}

export interface Data {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
}

export interface Character {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: Collection;
    series: Collection;
    stories: CollectionWithType[];
    events: Collection;
    urls: Url[];
}

export interface Thumbnail {
    path: string;
    extension: string;
}

export interface Collection {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}

export interface CollectionWithType extends Collection {
    items: ItemWithType[];
}

export interface Item {
    resourceURI: string;
    name: string;
}

export interface ItemWithType extends Item {
    type: string;
}

export interface Url {
    type: string;
    url: string;
}