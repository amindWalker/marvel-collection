// External depencendies
use serde::{self, Deserialize, Serialize};
// Local depencendies

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ComicsRoot {
    pub code: i64,
    pub status: String,
    pub copyright: String,
    pub attribution_text: String,
    #[serde(rename = "attributionHTML")]
    pub attribution_html: String,
    pub etag: String,
    pub data: ComicsList,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ComicsList {
    pub offset: i64,
    pub limit: i64,
    pub total: i64,
    pub count: i64,
    pub results: Vec<Comic>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Comic {
    pub id: i64,
    pub digital_id: i64,
    pub title: String,
    pub issue_number: f32,
    pub variant_description: String,
    pub description: Option<String>,
    pub modified: String,
    pub isbn: String,
    pub upc: String,
    pub diamond_code: String,
    pub ean: String,
    pub issn: String,
    pub format: String,
    pub page_count: i64,
    pub text_objects: Vec<TextObject>,
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub urls: Vec<Url>,
    pub series: Series,
    pub variants: Vec<Variant>,
    pub collected_issues: Vec<CollectedIssue>,
    pub dates: Vec<Date>,
    pub prices: Vec<Price>,
    pub thumbnail: Thumbnail,
    pub images: Vec<Image>,
    pub creators: Creators,
    pub characters: Characters,
    pub stories: Stories,
    pub events: Events,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TextObject {
    #[serde(rename = "type")]
    pub type_field: String,
    pub language: String,
    pub text: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Url {
    #[serde(rename = "type")]
    pub type_field: String,
    pub url: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Series {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Variant {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CollectedIssue {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Date {
    #[serde(rename = "type")]
    pub type_field: String,
    pub date: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Price {
    #[serde(rename = "type")]
    pub type_field: String,
    pub price: f32,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Thumbnail {
    pub path: String,
    pub extension: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Image {
    pub path: String,
    pub extension: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Creators {
    pub available: i64,
    #[serde(rename = "collectionURI")]
    pub collection_uri: String,
    pub items: Vec<CreatorItem>,
    pub returned: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CreatorItem {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
    pub role: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Characters {
    pub available: i64,
    #[serde(rename = "collectionURI")]
    pub collection_uri: String,
    pub items: Vec<CharacterItem>,
    pub returned: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct CharacterItem {
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
    pub items: Vec<StoryItem>,
    pub returned: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StoryItem {
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
    pub items: Vec<EventItem>,
    pub returned: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EventItem {
    #[serde(rename = "resourceURI")]
    pub resource_uri: String,
    pub name: String,
}
