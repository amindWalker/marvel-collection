use std::{future::Future, cell::Cell, any::Any};

// External depencendies
use dioxus::prelude::*;
// Local depencendies
use crate::{types::MarvelRoot, HasChanged};

const MARVEL_BASE_URL: &str = env!("MARVEL_BASE_URL");
const MARVEL_PBK: &str = env!("MARVEL_PBK");
const MARVEL_API_HASH: &str = env!("MARVEL_API_HASH");

pub struct Pagination<'z> {
    limit: UseSharedState<'z, PageLimit>,
    offset: UseSharedState<'z, PageOffset>,
}

impl<'z> Pagination<'z> {
    pub fn set_limit(&'z self, limit: usize) {
        self.limit.write().0 = limit;
    }
    pub fn read_limit(&'z self) -> usize {
        self.limit.read().0
    }
    pub fn set_offset(&'z self, offset: usize) {
        self.offset.write().0 = offset;
    }
    pub fn read_offset(&'z self) -> usize {
        self.offset.read().0
    }
}

pub struct PageLimit(pub usize);
pub struct PageOffset(pub usize);

pub(crate) fn pagination(cx: Scope) -> Pagination {
    let limit = use_shared_state::<PageLimit>(cx).unwrap();
    let offset = use_shared_state::<PageOffset>(cx).unwrap();
    Pagination { limit, offset }
}

// pub(crate) fn root_api(cx: Scope) -> Option<MarvelRoot> {
//     let query_limit = pagination(cx).read_limit();
//     let query_offset = pagination(cx).read_offset();

//     let fetch = use_future(
//         cx,
//         &(query_limit, query_offset),
//         |(query_limit, query_offset)| async move {
//             // gloo_net::http::Request::get(&format!("{MARVEL_BASE_URL}/v1/public/characters?limit={query_limit}&offset={query_offset}&ts=9&apikey={MARVEL_PBK}&hash={MARVEL_API_HASH}"))
//             gloo_net::http::Request::get("http://192.168.1.131:5500/mock.json")
//                 .send()
//                 .await
//                 .unwrap()
//                 .json::<MarvelRoot>()
//                 .await
//         },
//     );

//     match fetch.value() {
//         Some(Ok(ref api)) => Some(api.clone()),
//         _ => None,
//     }
// }

pub(crate) fn use_fetch(cx: &ScopeState) -> Option<MarvelRoot> {
    let fetch = use_future(cx, (), |_| async move {
        gloo_net::http::Request::get("http://192.168.1.131:5500/mock.json")
            .send()
            .await
            .unwrap()
            .json::<MarvelRoot>()
            .await
            .unwrap()
    });

    fetch.value().cloned()
}