use dioxus::prelude::*;
use crate::Nav;

#[component]
pub fn Header(nav_open: Signal<bool>) -> Element {
    let hamburger_menu = if nav_open.cloned() { "none" } else { "block" };

    rsx! {
        header {
            class: "base-container fixed z2 w-full bg-black/50 backdrop-blur flex items-center justify-center drop-shadow-lg",
            i {
                class: "i-line-md:menu absolute left-4 p4 bg-white/80 cursor-pointer {hamburger_menu}",
                // style: "display: {hamburger_menu};",
                onclick: move |_| nav_open.toggle(),
            }
            a {
                class: "hover:drop-shadow-2xl hover:scale-110",
                href: "https://marvel.com",
                img { src: asset!("assets/marvel.svg") }
            }
        }
    }
}
