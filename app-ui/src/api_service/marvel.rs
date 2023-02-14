use dioxus::prelude::{use_future, Scope, use_shared_state, UseSharedState, use_shared_state_provider};

use crate::types::MarvelRoot;

const MARVEL_BASE_URL: &str = env!("MARVEL_BASE_URL");
const MARVEL_PBK: &str = env!("MARVEL_PBK");
const MARVEL_API_HASH: &str = env!("MARVEL_API_HASH");

pub struct Pagination<'a> {
    limit: UseSharedState<'a, PageLimit>,
    offset: UseSharedState<'a, PageOffset>,
}



impl<'a> Pagination<'a> {
    pub fn set_limit(&'a self, limit: i32) {
        self.limit.write().0 = limit;
    }
    pub fn read_limit(&'a self) -> i32 {
        self.limit.read().0
    }
    pub fn set_offset(&'a self, offset: i32) {
        self.offset.write().0 = offset;
    }
    pub fn read_offset(&'a self) -> i32 {
        self.offset.read().0
    }
}

pub struct PageLimit(pub i32);
pub struct PageOffset(pub i32);

pub(crate) fn pagination(cx: Scope) -> Pagination {
    let limit = use_shared_state::<PageLimit>(cx).unwrap();
    let offset = use_shared_state::<PageOffset>(cx).unwrap();
    Pagination {
        limit,
        offset,
    }
}

pub(crate) fn root_api(cx: Scope) -> Result<MarvelRoot, gloo_net::Error> {
    let query_limit = pagination(cx).read_limit();
    let query_offset = pagination(cx).read_offset();

    let fetch_root_api = use_future(cx, &(query_limit, query_offset), |(query_limit, query_offset,)| async move {
        gloo_net::http::Request::get(&format!("{MARVEL_BASE_URL}/v1/public/characters?limit={query_limit}&offset={query_offset}&ts=9&apikey={MARVEL_PBK}&hash={MARVEL_API_HASH}"))
            .send()
            .await
            .unwrap()
            .json::<MarvelRoot>()
            .await
    });

    match fetch_root_api.value() {
        Some(Ok(ref comic)) => Ok(comic.clone()),
        Some(Err(ref err)) => Err(gloo_net::Error::GlooError(err.to_string())),
        _ => Err(gloo_net::Error::GlooError("Can't connect to Marvel at this time.".to_string()))
    }
}

