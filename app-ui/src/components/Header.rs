// External dependencies
use dioxus::prelude::*;
use fermi::{use_set, use_read};

use crate::{NAV_BAR, components::NavBar};
// Local dependencies

pub fn Header(cx: Scope) -> Element {
    let (is_open, set_is_open) = (use_read(cx, NAV_BAR), use_set(cx, NAV_BAR));
    let hamburger_menu = if is_open.0 { "none" } else { "block" };
    cx.render(
        rsx! {
            header {
                class: "@apply base-container fixed z2 w-full bg-black bg-opacity-50 backdrop-blur flex items-center justify-center drop-shadow-lg",
                i {
                    class: "i-line-md:menu absolute left-4 p4 bg-white opacity-80 cursor-pointer",
                    style: "display: {hamburger_menu};",
                    onclick: move |_| {
                        let state = !is_open.0;
                        set_is_open(NavBar(state));
                    },
                }
                a {
                    class: "hover:drop-shadow-2xl hover:scale-110",
                    href: "https://marvel.com",
                    img { src: "assets/marvel.svg" }
                }
            }
        }
    )
}