// External depencendies
use dioxus::prelude::*;
// Local depencendies
use crate::{api_service::pagination, types::MarvelRoot};

#[derive(Clone)]
pub struct NavBar(pub bool);

pub fn Nav(cx: Scope) -> Element {
    let is_open = use_shared_state::<NavBar>(cx).unwrap();
    let hamburger_container = if is_open.read().0 { "0" } else { "-24rem" };
    let hamburger_menu = if is_open.read().0 { "none" } else { "block" };
    let offset_state = use_state(cx, || 0);
    let limit_state = use_state(cx, || false);
    let api_data = use_shared_state::<MarvelRoot>(cx);

    cx.render(rsx! {
        //> MAIN HEADER
        header {
            class: "@apply base-container fixed z2 w-full bg-black bg-opacity-50 backdrop-blur flex items-center justify-center drop-shadow-lg",
            i {
                class: "i-line-md:menu absolute left-4 p4 bg-white opacity-80 cursor-pointer",
                style: "display: {hamburger_menu};",
                onclick: move |_| {
                    let state = !is_open.read().0;
                    is_open.write().0 = state;
                },
            }
            a {
                class: "hover:drop-shadow-2xl hover:scale-110",
                href: "https://marvel.com",
                img { src: "assets/marvel.svg" }
            }
        }
        //> NAV
        nav {
            class: "@apply transition-all duration-500 font-mono p4 z2 absolute grid h-full max-w-min place-items-center backdrop-filter backdrop-blur-xl backdrop-saturate-50 shadow-2xl shadow-black rounded-tr-xl text-white text-opacity-70",
            style: "transform: translateX({hamburger_container});",
            match api_data {
                Some(comic) => {
                    let comic = comic.read().clone();
                    rsx! {
                        i {
                            class: "@apply i-line-md:close justify-self-end self-start p4 cursor-pointer ",
                            onclick: move |_| {
                                let state = !is_open.read().0;
                                is_open.write().0 = state;
                            },
                        }
                        //> MENU
                        menu {
                            class: "@apply grid h-full mb34 text-lg text-center",
                            div {
                                class: "text-center grid place-items-center rounded-lg",
                                h2 {
                                    class: "text-center self-center font-bold text-6xl leading-6 rounded-lg",
                                    "{comic.data.total}",
                                    p {class: "text-4xl text-red-700 text-shadow-lg", "comics" }
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
                                            offset_state.set(state.clone().parse::<usize>().unwrap());
                                            pagination(cx).set_offset(state.clone().parse::<usize>().unwrap());
                                        },
                                    }
                                    button {
                                        class: "transition-all duration-500 bg-red-700 bg-opacity-80 hover:bg-opacity-100 p2 rounded-b-lg focus:brightness-125",
                                        "Go"
                                    }
                                }
                                p {class: "self-start", "From 0 - {comic.data.total}"},
                                div {
                                    class: "base-container grid grid-cols-2 p4 pt10 gap-x-8 place-items-center",
                                    p { class: "absolute self-start mt4 text-center font-bold", "Range limits" }

                                    [1,2,3,4,5].iter().map(|item| {
                                        rsx! {
                                            input {
                                                class: "@apply cursor-pointer appearance-none p5 i-mdi:toggle-switch-off checked:i-mdi:toggle-switch invert checked:invert-0 checked:bg-white",
                                                r#type: "radio",
                                                name: "pagination",
                                                value: "{item:?}",
                                                checked: if *item == 1 {"true"} else {"false"},
                                                onchange: move |event| {
                                                    let state = event.value == "{item}";
                                                    limit_state.set(state);
                                                    let limit = item * 20;
                                                    pagination(cx).set_limit(limit);
                                                },
                                            }
                                            p { class: "font-bold", "{item * 20}" }
                                        }
                                    })
                                }
                            }
                        }
                    }
                },
                _ => rsx! { i { class: "i-line-md:loading-twotone-loop p8 self-center bg-red-700" } },
            }
        }
    })
}
