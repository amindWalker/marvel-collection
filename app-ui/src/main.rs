#![allow(non_snake_case)]

// External depencendies
use dioxus::prelude::*;
use dioxus_router::{Router, Route, Redirect};
use components::{HeroProfile, Home, Nav, NavBar};
use types::MarvelRoot;
// External depencendies
mod types;
mod components;
mod api_service;
use crate::{components::Footer, api_service::use_fetch};

fn main() {
    wasm_logger::init(wasm_logger::Config::default());
    dioxus_web::launch(App)
}

pub(crate) struct HasChanged(bool);

fn App(cx: Scope) -> Element {
    use_shared_state_provider(cx, || api_service::PageLimit(20));
    use_shared_state_provider(cx, || api_service::PageOffset(0));
    use_shared_state_provider(cx, || NavBar(false));

    use_shared_state_provider(cx, || HasChanged(false));
    use_shared_state_provider::<Option<MarvelRoot>>(cx, || None);

    use_context_provider(cx, || "".to_string());

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
