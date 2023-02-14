use serde::{self, Deserialize, Serialize};

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MarvelRoot {
    pub code: i64,
    pub status: String,
    pub copyright: String,
    #[serde(rename = "attributionText")]
    pub attribution_text: String,
    #[serde(rename = "attributionHTML")]
    pub attribution_html: String,
    pub etag: String,
    pub data: Data,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Data {
    pub offset: i64,
    pub limit: i64,
    pub total: i64,
    pub count: i64,
    pub results: Vec<Result>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Result {
    pub id: i64,
    pub name: String,
    pub description: String,
    pub modified: String,
    pub thumbnail: Thumbnail,
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub comics: Comics,
    pub series: Series,
    pub stories: Stories,
    pub events: Events,
    pub urls: Vec<Url>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Thumbnail {
    pub path: String,
    pub extension: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Comics {
    pub available: i64,
    #[serde(rename = "collectionURI")]
    pub collection_uri: String,
    pub items: Vec<Item>,
    pub returned: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Item {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Series {
    pub available: i64,
    #[serde(rename = "collectionURI")]
    pub collection_uri: String,
    pub items: Vec<Item2>,
    pub returned: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Item2 {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Stories {
    pub available: i64,
    #[serde(rename = "collectionURI")]
    pub collection_uri: String,
    pub items: Vec<Item3>,
    pub returned: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Item3 {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
    #[serde(rename = "type")]
    pub type_field: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Events {
    pub available: i64,
    #[serde(rename = "collectionURI")]
    pub collection_uri: String,
    pub items: Vec<Item4>,
    pub returned: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Item4 {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Url {
    #[serde(rename = "type")]
    pub type_field: String,
    pub url: String,
}
