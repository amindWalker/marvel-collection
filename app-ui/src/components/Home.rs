// External depencendies
use dioxus::prelude::*;
use fermi::{use_read, use_atom_state};
// Local depencendies
use crate::{components::Card, NAV_BAR, ROOT_API};

use super::NavBar;

pub fn Home(cx: Scope) -> Element {
    let root_api = use_read(cx, ROOT_API);
    let set_navbar = use_atom_state(cx, NAV_BAR);

    cx.render(
        rsx! {
        div {
            //> HOME
            class: "@apply base-container grid overflow-hidden",
            onclick: move |_| {
                set_navbar.set(NavBar(false));
            },
            div {
                class: "overflow-y-hidden",
                section {
                    class: "grid grid-flow-col h100vh",
                    //> SEARCH
                    div {
                        class: "absolute justify-self-center max-h-xs z1",
                        div {
                            class: "grid mt24",
                            input {
                                class: "ml12 self-center justify-self-center p2 rounded-xl bg-black text-white text-center bg-opacity-20 hover:bg-opacity-30 focus:ring placeholder-black placeholder-opacity-40",
                                r#type: "search",
                                placeholder: "search",
                                prevent_default: "oninput",
                                // onchange: move |event| {
                                    // log::info!("{}", event.value);
                                // }
                            }
                            button {
                                class: "self-center p4 absolute i-line-md:search-twotone opacity-30"
                            }
                        }
                    }
                    //> CONTENT
                    article {
                        class: "@apply grid overflow-hidden",
                        div { class: "absolute w110% justify-self-center h100vh z0 bg-gradient-to-tl from-black via-sky-600" }
                        div { class: "absolute w110% justify-self-center h100vh z0 bg-gradient-to-t from-black via-sky-900 animate-pulse animate-duration-5000" }
                                div {
                                    class: " -rotate-2 p4 -ml8 self-center min-h-max grid grid-flow-col overflow-x-scroll overflow-y-hidden",
                                    header { class: "grid max-w-48",
                                        h1 {
                                            class: "text-center py-16 self-center -rotate-90 font-sans text-white text-6xl animate-pulse animate-ease-in-out",
                                            "CHOOSE"
                                            br{}
                                            sup {class: "text-3xl", "YOUR HERO"}
                                        }
                                    }

                                    match root_api {
                                        Some(comics) => {
                                            rsx! {
                                                comics.data.results.iter().enumerate().map(|(index, hero)| {
                                                    let key = hero.id;
                                                    let thumb = format!("{}.{}", hero.thumbnail.path, hero.thumbnail.extension);
                                                    let backdrop = format!("{}.{}", hero.thumbnail.path, hero.thumbnail.extension);
                                                    let thumb = if thumb == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" {"assets/MarvelUnavailable.svg".to_string()} else {thumb};
                                                    rsx! {
                                                        //> CARD HOME
                                                        Card {
                                                            r#key: key,
                                                            index: index,
                                                            link_to: "/hero",
                                                            thumb: thumb.to_string(),
                                                            hero_name: hero.name.to_string(),
                                                            comics_available: hero.comics.available,
                                                            backdrop_img: backdrop,
                                                        }
                                                    }
                                                })
                                            }
                                        },
                                        _ => rsx! {
                                            p {
                                                class: "i-line-md:loading-twotone-loop p8 self-center bg-red-700 rotate-2 text-white",
                                            }
                                        },
                                    }
                                }
                        }
                    }
                }
            }
        }
    )
}
