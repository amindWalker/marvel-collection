use dioxus::prelude::*;
use crate::{api_service::fetch_marvel_data, types::CharactersRoot};

#[component]
pub fn Nav(nav_open: Signal<bool>, limit: Signal<usize>) -> Element {
    let a = nav_open.cloned();
    let root_api = use_resource(move || fetch_marvel_data(limit.cloned()));
    let offset_input = use_signal(String::new);

    rsx! {
        nav {
            class: "transition-all duration-500 font-mono p-4 z-2 absolute grid gap-y-16 h-full auto-rows-min max-w-min place-items-center backdrop-blur-xl shadow-2xl shadow-black rounded-tr-xl text-white/70",
            if *nav_open.read() { "translate-x-0" } else { "-translate-x-96" },

            match &*root_api.read() {
                Some(Ok(comic)) => rsx! {
                    i {
                        class: "i-line-md:close justify-self-end self-start p-4 cursor-pointer",
                        onclick: move |_| nav_open.toggle(),
                    }
                    menu {
                        class: "grid h-full text-lg text-center",
                        div {
                            class: "text-center grid gap-y-8 place-items-center rounded-lg",
                            h2 {
                                class: "text-6xl leading-6",
                                "{comic.data.total}",
                                p { class: "text-4xl text-red-700", "comics" }
                            }
                            div {
                                class: "base-container grid grid-cols-2 p-4 pt-10 gap-x-8",
                                p { class: "font-bold mt-4", "Range limits" }

                                {(1..=5).map(|item| {
                                    let limit_val = item * 20;
                                    rsx! {
                                        label {
                                            class: "flex items-center gap-2 cursor-pointer",
                                            input {
                                                r#type: "radio",
                                                name: "pagination",
                                                value: "{limit_val}",
                                                checked: *limit.read() == limit_val,
                                                class: "h-4 w-4 border-gray-300 text-red-700 focus:ring-red-700",
                                                oninput: move |e| {
                                                    if let Ok(val) = e.value().parse::<usize>() {
                                                        limit.set(val);
                                                    }
                                                }
                                            }
                                            span { class: "font-bold", "{limit_val}" }
                                        }
                                    }
                                })}
                            }
                            div {
                                class: "grid",
                                input {
                                    class: "p-2 bg-black/10 hover:bg-black/20 rounded-t-lg",
                                    r#type: "search",
                                    placeholder: "Offset...",
                                    value: "{offset_input}",
                                    // oninput: move |e| offset_input.cloned(),
                                }
                                button {
                                    class: "bg-red-700/80 hover:bg-red-700 p-2 rounded-b-lg",
                                    onclick: move |_| {
                                        if let Ok(num) = offset_input.cloned().parse::<usize>() {
                                            limit.set(num);
                                        }
                                    },
                                    "Go"
                                }
                            }
                        }
                    }
                },
                Some(Err(e)) => rsx! { p { "Error: {e}" } },
                None => rsx! { i { class: "i-line-md:loading-twotone-loop p-8" } }
            }
        }
    }
}
