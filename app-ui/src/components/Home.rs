// External depencendies
use dioxus::prelude::*;
// Local depencendies
use crate::{components::Card, types::MarvelRoot};

use super::NavBar;

pub fn Home(cx: Scope) -> Element {
    let nav_bar = use_shared_state::<NavBar>(cx).unwrap();
    let empty_data = MarvelRoot { ..Default::default() };
    let api_data = use_shared_state::<MarvelRoot>(cx);

    cx.render(
        rsx! {
        div {
            //> HOME
            class: "@apply base-container grid overflow-hidden",
            onclick: move |_| {
                // nav_bar.write().0 = false;
                // *api_data.unwrap().write() = comics.clone();
                // log::info!("{:?}", dioxus_web::use_eval(cx)("console.log('API LOADED: ' )").get());
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
                        div { class: "absolute w110% justify-self-center h100vh z0 bg-gradient-to-tl from-black to-light-blue-900" }
                        div { class: "absolute w110% justify-self-center h100vh z0 bg-gradient-to-t from-black to-sky-500 animate-pulse animate-duration-6000" }
                                div {
                                    class: " -rotate-2 p4 -ml8 self-center min-h-max grid grid-flow-col overflow-x-scroll overflow-y-hidden",
                                    header { class: "grid max-w-48",
                                        h1 {
                                            class: "text-center self-center -rotate-90 font-sans text-white text-6xl animate-pulse animate-ease-in-out",
                                            "CHOOSE"
                                            br{}
                                            sup {class: "text-3xl", "YOUR HERO"}
                                        }
                                    }
                                    match api_data {
                                        Some(comics) => {
                                            let comics = comics.read().clone();
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
                                        _ => rsx! { p { "Loading the database. If it takes too long, wait a few minutes and try again." } },
                                    }
                                }
                        }
                    }
                }
            }
        }
    )
}
