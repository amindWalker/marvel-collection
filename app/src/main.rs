#![allow(non_snake_case)]
#![feature(is_some_and)]

// External depencendies
use components::{Home, Nav, NavBar};
use dioxus::prelude::*;
use dioxus_router::{Redirect, Route, Router};
use fermi::{use_init_atom_root, Atom};
// Local depencendies
use types::CharactersRoot;
mod api_service;
mod components;
mod types;
use crate::{
    api_service::fetch_and_cache,
    components::{Footer, Header},
};

pub(crate) static ROOT_API: Atom<Option<CharactersRoot>> = |_| None;
pub(crate) static NAV_BAR: Atom<NavBar> = |_| NavBar(false);
pub(crate) static PAGE_LIMIT: Atom<usize> = |_| 100;
pub(crate) static LOADING: Atom<bool> = |_| true;

const MARVEL_BASE_URL: &str = env!("MARVEL_BASE_URL");
const MARVEL_PBK: &str = env!("MARVEL_PBK");
const MARVEL_API_HASH: &str = env!("MARVEL_API_HASH");

fn main() {
    wasm_log::init(wasm_log::Config::default());
    dioxus_web::launch(App)
}

fn App(cx: Scope) -> Element {
    use_init_atom_root(cx);

    println!("{:?}", fetch_and_cache(cx));
    cx.render(rsx! {
        Router {
            Header {}
            Nav {}
            Route { to: "/home", Home {} }
            // Route { to: "/hero", HeroProfile {} }
            Redirect { from: "", to: "/home" }
            Footer {}
        }
    })
}
