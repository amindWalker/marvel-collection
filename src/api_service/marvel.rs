// marvel_api.rs
use reqwest::Client;
use serde::{Deserialize, Serialize};
use crate::types::CharactersRoot;

const MARVEL_BASE_URL: &str = env!("MARVEL_BASE_URL");
const MARVEL_URL_TIMESTAMP: &str = env!("MARVEL_URL_TIMESTAMP");
const MARVEL_PUB_KEY: &str = env!("MARVEL_PUB_KEY");
const MARVEL_API_HASH: &str = env!("MARVEL_API_HASH");

#[derive(Clone, PartialEq, Serialize, Deserialize)]
pub struct Pagination {
    pub limit: usize,
    pub offset: usize,
    pub search: String,
}

pub async fn fetch_marvel_data(
    pagination: Pagination
) -> Result<CharactersRoot, reqwest::Error> {
    let url = format!(
        "{}/v1/public/characters?\
        limit={}&\
        offset={}&\
        nameStartsWith={}&\
        ts={}&\
        apikey={}&\
        hash={}",
        MARVEL_BASE_URL,
        pagination.limit,
        pagination.offset,
        pagination.search,
        MARVEL_URL_TIMESTAMP,
        MARVEL_PUB_KEY,
        MARVEL_API_HASH
    );

    Client::new()
        .get(&url)
        .send()
        .await?
        .json::<CharactersRoot>()
        .await
}