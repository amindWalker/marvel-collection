// External depencendies
use dioxus::prelude::*;
use fermi::{use_atom_state, use_read, use_set};
// Local depencendies
use crate::{types::CharactersRoot, LOADING, PAGE_LIMIT, ROOT_API};

const MARVEL_BASE_URL: &str = env!("MARVEL_BASE_URL");
const MARVEL_PBK: &str = env!("MARVEL_PBK");
const MARVEL_API_HASH: &str = env!("MARVEL_API_HASH");

#[derive(PartialEq)]
pub struct PageLimit(pub usize);
#[derive(PartialEq)]
pub struct PageOffset(pub usize);

// #[cached::proc_macro::once(time = 86400, option = true, sync_writes = true)]
pub(crate) fn fetch_and_cache(cx: Scope) -> Option<CharactersRoot> {
    let limit = *use_read(cx, PAGE_LIMIT);
    let offset = "";
    println!("[FETCH SERVICE] LIMIT: {limit}");
    let set_loading = use_atom_state(cx, LOADING);

    let fetch = use_future(cx, &(limit, offset), |(limit, offset)| async move {
        // gloo::net::http::Request::get(&format!("{MARVEL_BASE_URL}/v1/public/characters?limit={limit}&offset={offset}&ts=9&apikey={MARVEL_PBK}&hash={MARVEL_API_HASH}"))
        gloo::net::http::Request::get("http://192.168.1.131:5500/mock.json")
            .send()
            .await
            .unwrap()
            .json::<CharactersRoot>()
            .await
    });

    match fetch.value() {
        Some(data) => {
            set_loading.set(false);
            global_state(cx, data.as_ref().ok().cloned());
            data.as_ref().ok().cloned()
        }
        _ => None,
    }
}

pub(crate) fn global_state(cx: &ScopeState, cache: Option<CharactersRoot>) {
    if let Some(cached_data) = cache.as_ref().cloned() {
        use_set(cx, ROOT_API)(Some(cached_data));
    }
}
