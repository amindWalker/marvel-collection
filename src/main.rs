#![allow(non_snake_case)]
use dioxus::{document::Stylesheet, html::g::class, prelude::*};
use components::{Footer, Header, Home, NavWrapper, HeroProfile};

mod api_service;
mod components;
mod types;

#[derive(Routable, Clone, PartialEq)]
enum Route {
    #[layout(MainLayout)]
        #[route("/")]
        Home {},

        // #[nest("/characters")]
        //     #[route("/:id")]
        //     HeroProfile { id: usize },

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
        // Header { nav_open }
        NavWrapper {}
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
            Link { to: Route::Home {}, "Return Home" }
        }
    }
}

#[component]
fn App() -> Element {
    let nav_open = use_signal(|| false);
    let limit = use_signal(|| 100);
    let characters_data = use_signal(|| 1);

    let mut is_sidebar_open = use_signal(|| true);

    provide_root_context(nav_open);
    provide_root_context(limit);
    provide_context(Signal::new(characters_data));

    rsx! {
        Stylesheet { href: asset!("assets/output.css") }

        div { class: "min-h-screen bg-background flex",
            // Sidebar with responsive collapse
            aside {
                class: "fixed lg:relative inset-y-0 left-0 z-50 bg-background border-r transition-all duration-300 overflow-hidden",
                class: "w-64 lg:w-20", // Desktop collapsed width
                class: if *is_sidebar_open.read() { "lg:w-64" }, // Desktop expanded width
                class: "-translate-x-full lg:translate-x-0", // Mobile handling
                class: if *is_sidebar_open.read() { "translate-x-0" }, // Mobile open

                div { class: "h-full flex flex-col",
                    // Collapse/Expand button
                    button {
                        class: "hidden lg:flex items-center p-4 hover:bg-accent w-full",
                        onclick: move |_| is_sidebar_open.toggle(),
                        aria_label: "Toggle sidebar",
                        span {
                            class: "icon-[tabler--layout-sidebar-left-collapse] text-xl",
                            class: if !*is_sidebar_open.read() { "icon-[tabler--layout-sidebar-left-expand]" }
                        }
                    }

                    // Navigation items
                    nav { class: "flex-1 px-2 py-4 space-y-1",
                        SidebarItem {
                            icon: "icon-[tabler--dashboard]",
                            label: "Dashboard",
                            is_active: true,
                            is_sidebar_open: *is_sidebar_open.read()
                        }
                        SidebarItem {
                            icon: "icon-[tabler--settings]",
                            label: "Settings",
                            is_active: false,
                            is_sidebar_open: *is_sidebar_open.read()
                        }
                    }
                }
            }

            // Main content area
            main {
                class: "flex-1 transition-margin duration-300",
                class: "lg:ml-20", // Collapsed desktop
                class: if *is_sidebar_open.read() { "lg:ml-64" }, // Expanded desktop

                // Topbar
                nav {
                    class: "sticky top-0 z-40 border-b bg-background/95 backdrop-blur",
                    div { class: "flex h-14 items-center px-4 lg:hidden",
                        button {
                            class: "p-2 rounded-md hover:bg-accent",
                            onclick: move |_| is_sidebar_open.toggle(),
                            aria_label: "Toggle sidebar",
                            span {
                                class: "text-xl",
                                class: if *is_sidebar_open.read() {
                                    "icon-[tabler--layout-sidebar-left-collapse]"
                                } else {
                                    "icon-[tabler--layout-sidebar-left-expand]"
                                }
                            }
                        }
                    }
                }

                // Page content
                div { class: "p-4", "Main Content" }
            }

            // Mobile overlay
            div {
                class: "lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity",
                class: if *is_sidebar_open.read() { "opacity-100" } else { "opacity-0 pointer-events-none" },
                onclick: move |_| is_sidebar_open.set(false),
            }
        }
    }
}

#[component]
fn SidebarItem(
    icon: &'static str,
    label: &'static str,
    is_active: bool,
    is_sidebar_open: bool,
) -> Element {
    rsx! {
        a {
            class: "group flex items-center p-2 rounded-lg hover:bg-accent relative",
            class: if is_active { "bg-accent" },
            href: "#",

            // Icon
            span {
                class: "text-xl {icon}",
                class: if is_sidebar_open { "mr-3" } // Space when expanded
            }

            // Text label (hidden when collapsed)
            span {
                class: "lg:opacity-0 lg:group-hover:opacity-100 transition-opacity",
                class: if is_sidebar_open { "opacity-100" } else { "opacity-0" },
                {label}
            }

            // Tooltip for collapsed state
            div {
                class: "absolute left-14 top-1/2 -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-sm",
                class: "opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none",
                class: if is_sidebar_open { "hidden" },
                {label}
            }
        }
    }
}

fn main() {
    launch(App);
}
