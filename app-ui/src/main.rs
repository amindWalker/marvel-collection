#![allow(non_snake_case)]
#![feature(async_closure)]
#![feature(once_cell)]

use api_service::{fetch_and_cache, globa_state, FETCH_AND_CACHE};
// External depencendies
use components::{HeroProfile, Home, Nav, NavBar};
use dioxus::prelude::*;
use dioxus_router::{Redirect, Route, Router};
use fermi::{use_atom_state, use_init_atom_root, Atom};
// Local depencendies
use types::{Character, MarvelRoot};
mod api_service;
mod components;
mod types;
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

    cx.render(rsx! {
        Router {
            Nav {}
            Route { to: "/home", Home {} }
            Route { to: "/hero", HeroProfile {} }
            Redirect { from: "", to: "/home" }
            Footer {}
        }
    })
}
