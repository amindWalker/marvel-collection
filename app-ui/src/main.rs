#![allow(non_snake_case)]
#![feature(async_closure)]
#![feature(once_cell)]

use api_service::{fetch_and_cache, FETCH_AND_CACHE, globa_state};
// External depencendies
use dioxus::prelude::*;
use dioxus_router::{Router, Route, Redirect};
use components::{HeroProfile, Home, Nav, NavBar};
use fermi::{Atom, use_init_atom_root, use_atom_state};
// Local depencendies
use types::{MarvelRoot, Character};
mod types;
mod components;
mod api_service;
use crate::components::Footer;

pub(crate) static ROOT_API: Atom<Option<MarvelRoot>> = |_| None;
pub(crate) static CHARACTERS: Atom<Option<Character>> = |_| None;
// pub(crate) static COMICS: Atom<Option<MarvelRoot>> = |_| None;
// pub(crate) static CREATORS: Atom<Option<MarvelRoot>> = |_| None;
// pub(crate) static EVENTS: Atom<Option<MarvelRoot>> = |_| None;
// pub(crate) static SERIES: Atom<Option<MarvelRoot>> = |_| None;
// pub(crate) static STORIES: Atom<Option<MarvelRoot>> = |_| None;

fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    dioxus_web::launch(App)
}

fn App(cx: Scope) -> Element {
    use_init_atom_root(cx);
    use_atom_state(cx, CHARACTERS);

    use_shared_state_provider(cx, || api_service::PageLimit(20));
    use_shared_state_provider(cx, || api_service::PageOffset(0));
    use_shared_state_provider(cx, || NavBar(false));

    log::info!("FETCH_AND_CACHE: {:?}", FETCH_AND_CACHE.read());
    if let Ok(cache_data) = FETCH_AND_CACHE.read().as_deref() {
        if cache_data.is_some() {
            if let Some((_, cache)) = cache_data {
                globa_state(cx, Some(cache.clone()));
            }
        } else {
            fetch_and_cache(cx);
        }
    }

    cx.render(
        rsx! {
        Router {
            Nav {}
            Route { to: "/home", Home {} }
            Route { to: "/hero", HeroProfile {} }
            Redirect { from: "", to: "/home" }
            Footer {}
        }
    })
}
