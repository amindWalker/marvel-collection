#![allow(non_snake_case)]
#![feature(is_some_and)]
// External depencendies
use components::{Home, Nav, NavBar};
use dioxus::prelude::*;
use dioxus_router::{Redirect, Route, Router};
use fermi::{use_init_atom_root, Atom};
// Local depencendies
use types::MarvelRoot;
mod api_service;
mod components;
mod types;
use crate::components::{Footer, Header};

pub(crate) static ROOT_API: Atom<Option<MarvelRoot>> = |_| None;
pub(crate) static NAV_BAR: Atom<NavBar> = |_| NavBar(false);
pub(crate) static PAGE_LIMIT: Atom<usize> = |_| 100;
pub(crate) static LOADING: Atom<bool> = |_| true;

fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    dioxus_web::launch(App)
}

fn App(cx: Scope) -> Element {
    use_init_atom_root(cx);

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
