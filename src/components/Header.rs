use dioxus::prelude::*;

#[component]
pub fn Header(nav_open: Signal<bool>) -> Element {
    rsx! {
        header {
            class: "base-container fixed z-20 w-full bg-black/50 backdrop-blur-lg flex items-center justify-center drop-shadow-lg",
            i {
                class: "i-ph-list absolute left-4 p-4 bg-white/80 cursor-pointer transition-transform",
                class: if *nav_open.read() { "block" } else { "block" },
                onclick: move |_| nav_open.toggle(),
            }
            a {
                class: "hover:drop-shadow-2xl hover:scale-110 transition-transform",
                href: "https://marvel.com",
                img {
                    class: "h-12 w-auto",
                    src: asset!("assets/marvel.svg"),
                    alt: "Marvel Logo"
                }
            }
        }
    }
}