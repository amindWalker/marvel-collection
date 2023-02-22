// External depencendies
use dioxus::prelude::*;
use fermi::{use_read, use_set, use_atom_state};
// Local depencendies
use crate::{ROOT_API, NAV_BAR, PAGE_LIMIT};

#[derive(Clone)]
pub struct NavBar(pub bool);

pub fn Nav(cx: Scope) -> Element {
    let (is_open, set_is_open) = (use_read(cx, NAV_BAR), use_set(cx, NAV_BAR));
    let (page_limit, set_page_limit) = (use_read(cx, PAGE_LIMIT), use_atom_state(cx, PAGE_LIMIT));
    let hamburger_container = if is_open.0 { "0" } else { "-24rem" };
    let is_limit_checked = use_state(cx, || false);
    let root_api = use_read(cx, ROOT_API);

    let limit = *use_read(cx, PAGE_LIMIT);
    log::info!("[COMPONENT] LIMIT: {limit}");

    cx.render(
        rsx! {
        //> NAV
        nav {
            class: "@apply transition-all duration-500 font-mono p4 z2 absolute grid gap-y-16 h-full auto-rows-min max-w-min place-items-center backdrop-filter backdrop-blur-xl backdrop-saturate-50 shadow-2xl shadow-black rounded-tr-xl text-white text-opacity-70",
            style: "transform: translateX({hamburger_container});",
            match root_api {
                Some(comic) => {
                    rsx! {
                        i {
                            class: "@apply i-line-md:close justify-self-end self-start p4 cursor-pointer ",
                            onclick: move |_| {
                                let state = !is_open.0;
                                set_is_open(NavBar(state));
                            },
                        }
                        //> MENU
                        menu {
                            class: "@apply grid h-full text-lg text-center",
                            div {
                                class: "text-center grid gap-y-8 place-items-center rounded-lg",
                                h2 {
                                    class: "text-center self-center font-bold text-6xl leading-6 rounded-lg",
                                    "{comic.data.total}",
                                    p {class: "text-4xl text-red-700 text-shadow-lg", "comics" }
                                }
                                div {
                                    class: "base-container grid grid-cols-2 p4 pt10 gap-x-8 place-items-center",
                                    p {
                                        class: "absolute self-start mt4 text-center font-bold",
                                        "Range limits"
                                    }

                                    [1,2,3,4,5].iter().enumerate().map(|(index, item)| {
                                        rsx! {
                                            input {
                                                "key": "{index + item}",
                                                class: "@apply cursor-pointer appearance-none p5 i-mdi:toggle-switch-off checked:i-mdi:toggle-switch invert checked:invert-0 checked:bg-white",
                                                r#type: "radio",
                                                name: "pagination",
                                                value: "{item:?}",
                                                checked: if *item == 5 {"true"} else {"false"}, // Setting 100 as default
                                                onchange: move |event| {
                                                    let state = event.value == "{item}";
                                                    is_limit_checked.set(state);
                                                    let limit = *item * 20;
                                                    set_page_limit.set(limit);
                                                },
                                            }
                                            p { class: "font-bold", "{item * 20}" }
                                        }
                                    })
                                }
                                p {
                                    class: "self-end text-center font-bold",
                                    "Offset comics"
                                }
                                div {
                                    class: "grid",
                                    input {
                                        class: "transition-all duration-500 p2 bg-black bg-opacity-10 hover:bg-opacity-20 rounded-t-lg text-center placeholder-light-500",
                                        r#type: "search",
                                        prevent_default: "oninput",
                                        onchange: move |event| {
                                            let state = &event.value;
                                            // TODO: offset_limit
                                        },
                                    }
                                    button {
                                        class: "transition-all duration-500 bg-red-700 bg-opacity-80 hover:bg-opacity-100 p2 rounded-b-lg focus:brightness-125",
                                        "Go"
                                    }
                                }
                                p {class: "self-start", "From 0 - {comic.data.total}"},
                            }
                        }
                    }
                },
                _ => rsx! { i { class: "i-line-md:loading-twotone-loop p8 self-center bg-red-700" } },
            }
        }
    })
}
