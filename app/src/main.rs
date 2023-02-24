#![allow(non_snake_case)]
#![feature(is_some_and)]
use std::net::SocketAddr;

use axum::{routing::get, Router};
use axum_extra::routing::SpaRouter;
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
use crate::components::{Footer, Header};

pub(crate) static ROOT_API: Atom<Option<CharactersRoot>> = |_| None;
pub(crate) static NAV_BAR: Atom<NavBar> = |_| NavBar(false);
pub(crate) static PAGE_LIMIT: Atom<usize> = |_| 100;
pub(crate) static LOADING: Atom<bool> = |_| true;

#[tokio::main]
async fn main() {
    // wasm_log::init(wasm_log::Config::default());
    // dioxus_web::launch(App)

    let (SOCKET, PORT) = ([127, 0, 0, 1], 8080);
    let addr = SocketAddr::from((SOCKET, PORT));
    let view = dioxus_liveview::LiveViewPool::new();

    let app = Router::new()
        .route(
            "/",
            axum::routing::get(move || async move {
                axum::response::Html(format!(
                    r#"
            <!DOCTYPE html>
            <html>
            <head>
                <title>Marvel Collection</title>
                <meta content="text/html;charset=utf-8" http-equiv="Content-Type" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta charset="UTF-8" />
                <link rel="stylesheet" href="assets/uno.css">
                <link rel="stylesheet" href="assets/tailwind.min.css">
            </head>
            <body> <div id="main"></div> </body>
                {glue}
            </html>
            "#,
                    glue = dioxus_liveview::interpreter_glue(&format!("ws://{addr}/ws"))
                ))
            }),
        )
        .route(
            "/ws",
            get(move |ws: axum::extract::WebSocketUpgrade| async move {
                ws.on_upgrade(move |socket| async move {
                    _ = view.launch(dioxus_liveview::axum_socket(socket), App).await;
                })
            }),
        )
        .merge(SpaRouter::new("/assets", "assets").index_file("index.html"));

    println!("Listening on http://{addr}");

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

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
