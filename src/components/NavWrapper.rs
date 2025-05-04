use dioxus::prelude::*;
use crate::{api_service::fetch_marvel_data, components::Home, types::CharactersRoot};

#[component]
pub fn NavWrapper() -> Element {
    let mut is_sidebar_open = use_signal(|| false);
    let is_mobile = use_signal(|| false);

    rsx! {
        // Topbar
        nav {
            class: "fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur",
            div { class: "flex h-14 items-center px-4",
                button {
                    class: "lg:hidden mr-2",
                    onclick: move |_| is_sidebar_open.toggle(),
                    aria_label: "Toggle sidebar",
                    svg {
                        class: "h-5 w-5",
                        view_box: "0 0 24 24",
                        stroke_width: "1.5",
                        stroke: "currentColor",
                        fill: "none",
                        path {
                            d: if *is_sidebar_open.read() {
                                "M6 18L18 6M6 6l12 12"
                            } else {
                                "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            }
                        }
                    }
                }
                div { class: "flex items-center space-x-4",
                        class: "text-lg font-semibold",
                        "My App"
                }
            }
        }

        // Sidebar with overlay
        if *is_sidebar_open.read() || !*is_mobile.read() {
            aside {
                class: "fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform lg:translate-x-0",
                class: if *is_mobile.read() && !*is_sidebar_open.read() { "-translate-x-full" },
                div { class: "h-full px-3 py-4 overflow-y-auto",
                    nav { class: "space-y-1",
                    div {
                        class: "flex items-center p-2 rounded-lg hover:bg-accent",
                        "Dashboard"
                    }
                    div {
                        class: "flex items-center p-2 rounded-lg hover:bg-accent",
                        "Settings"
                    }
                    }
                }
            }
        }

        // Overlay for mobile
        if *is_mobile.read() && *is_sidebar_open.read() {
            div {
                class: "fixed inset-0 z-40 bg-black/50 lg:hidden",
                onclick: move |_| is_sidebar_open.set(false),
                aria_hidden: "true",
            }
        }
    }
}
