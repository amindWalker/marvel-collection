#![allow(non_snake_case)]
use dioxus::{document::Stylesheet, prelude::*};
use components::{Footer, Header, Home, Nav, HeroProfile};

mod api_service;
mod components;
mod types;

#[derive(Routable, Clone, PartialEq)]
enum Route {
    #[layout(MainLayout)]
        #[route("/home")]
        // #[redirect("/", "/home")]
        // #[redirect("", "/home")]
        Home { nav_open: Signal<bool> },

        #[nest("/hero")]
            #[route("/:id")]
            HeroProfile { id: usize },

    #[end_layout]
    #[route("/:..route")]
    PageNotFound {
        route: Vec<String>,
    },
}

#[component]
fn MainLayout() -> Element {
    let nav_open = use_signal(|| false);
    let limit = use_signal(|| 100);

    rsx! {
        Header { nav_open }
        Nav { nav_open, limit }
        Outlet::<Route> {}
        Footer {}
    }
}

#[component]
fn PageNotFound(route: Vec<String>) -> Element {
    let nav_open = use_context::<Signal<bool>>();

    rsx! {
        div { class: "error-page",
            h1 { "404 - Page Not Found" }
            p { r#"Unknown route: {route.join("/")}"# }
            Link { to: Route::Home { nav_open }, "Return Home" }
        }
    }
}


#[component]
fn App() -> Element {
    let nav_open = use_signal(|| false);
    let limit = use_signal(|| 100);
    let characters_data = use_signal(|| 1);

    provide_root_context(nav_open);
    provide_root_context(limit);
    provide_context(Signal::new(characters_data));

    rsx! {
        Stylesheet { href: asset!("assets/uno.css") }
        Stylesheet { href: asset!("assets/tailwind.min.css") }

        Home { nav_open }
    }
}

fn main() {
    launch(App);
}
