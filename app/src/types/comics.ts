export interface ComicsRoot {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: ComicsData;
  }

  export interface ComicsData {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Comic[];
  }

  export interface Comic {
    id?: number;
    digitalId?: number;
    title: string;
    issueNumber?: number;
    variantDescription?: string;
    description?: string;
    modified?: string;
    isbn?: string;
    upc?: string;
    diamondCode?: string;
    ean?: string;
    issn?: string;
    format?: string;
    pageCount?: number;
    textObjects?: ComicTextObject[];
    resourceURI?: string;
    urls?: ComicUrl[];
    series?: ComicResource;
    variants?: ComicResource[];
    collections?: ComicResource[];
    collectedIssues?: ComicResource[];
    dates?: ComicDate[];
    prices?: ComicPrice[];
    thumbnail?: ComicImage;
    images?: ComicImage[];
    creators?: ComicCollection;
    characters?: ComicCollection;
    stories?: ComicCollectionWithType;
    events?: ComicCollection;
  }

  export interface ComicTextObject {
    type: string;
    language: string;
    text: string;
  }

  export interface ComicUrl {
    type: string;
    url: string;
  }

  export interface ComicResource {
    resourceURI: string;
    name: string;
  }

  export interface ComicDate {
    type: string;
    date: string;
  }

  export interface ComicPrice {
    type: string;
    price: number;
  }

  export interface ComicImage {
    path: string;
    extension: string;
  }

  export interface ComicCollection {
    available: number;
    collectionURI: string;
    items: ComicItem[];
    returned: number;
  }

  export interface ComicItem {
    resourceURI: string;
    name: string;
    role?: string;
  }

  export interface ComicCollectionWithType extends ComicCollection {
    items: ComicItemWithType[];
  }

  export interface ComicItemWithType extends ComicItem {
    type: string;
  }
