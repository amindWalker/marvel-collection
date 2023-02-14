#![allow(non_snake_case)]
#![feature(async_closure)]

use dioxus::prelude::*;
use dioxus_router::{Router, Route, Redirect};
mod types;
mod components;
use components::{HeroProfile, Home};
mod api_service;

fn main() {
    // wasm_logger::init(wasm_logger::Config::default());
    dioxus_web::launch(App)
}

fn App(cx: Scope) -> Element {
    use_shared_state_provider(cx, || api_service::PageLimit(20));
    use_shared_state_provider(cx, || api_service::PageOffset(0));

    cx.render(rsx! {
        rsx!{
            Router {
                Route { to: "/home", Home {} }
                Route { to: "/hero", HeroProfile {} }
                Redirect { from: "", to: "/home" }
            }
        }
    })
}
