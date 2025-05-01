use crate::{api_service::fetch_marvel_data, components::Card};
use dioxus::prelude::*;

#[component]
pub fn Home(nav_open: Signal<bool>) -> Element {
    let root_api = use_resource(move || fetch_marvel_data(100));
    let limit = use_signal(|| 100);

    rsx! {
        div {
            class: "base-container grid overflow-hidden",
            onclick: move |_| nav_open.set(false),
            div {
                class: "overflow-y-hidden",
                section {
                    class: "grid grid-flow-col h-screen",
                    div {
                        class: "absolute justify-self-center max-h-xs z1",
                        div {
                            class: "grid mt-24",
                            input {
                                class: "ml-12 self-center justify-self-center p-2 rounded-xl bg-black/20 text-white text-center placeholder-black/40 focus:ring",
                                r#type: "search",
                                placeholder: "search",
                                onclick: move |e| e.prevent_default(),
                            }
                            button { class: "self-center p-4 absolute i-line-md:search-twotone opacity-30" }
                        }
                    }
                    article {
                        class: "grid overflow-hidden",
                        div { class: "absolute w-[110%] justify-self-center h-screen z-0 bg-gradient-to-tl from-black via-sky-600" }
                        div { class: "absolute w-[110%] justify-self-center h-screen z-0 bg-gradient-to-t from-black via-sky-900 animate-pulse animate-duration-5000" }
                        div {
                            class: "-rotate-2 p-4 -ml-8 self-center min-h-max grid grid-flow-col overflow-x-scroll overflow-y-hidden",
                            header {
                                class: "grid max-w-48",
                                h1 {
                                    class: "text-center py-16 self-center -rotate-90 font-sans text-white text-6xl animate-pulse",
                                    "CHOOSE"
                                    br {}
                                    sup { class: "text-3xl", "YOUR HERO" }
                                }
                            }
                            match &*root_api.read() {
                                Some(Ok(comics)) =>
                                    rsx! {
                                        {comics.data.results.iter().enumerate().map(|(index, hero)| {
                                            let thumb = format!("{}.{}", hero.thumbnail.path, hero.thumbnail.extension);
                                            let thumb = if thumb.contains("image_not_available") {
                                                asset!("assets/MarvelUnavailable.svg").to_string()
                                            } else {
                                                thumb
                                            };
                                            rsx! {
                                                Card {
                                                    key: "{hero.id}",
                                                    index,
                                                    link_to: "/hero",
                                                    thumb,
                                                    hero_name: hero.name.clone(),
                                                    comics_available: hero.comics.available,
                                                    backdrop_img: format!("{}.{}", hero.thumbnail.path, hero.thumbnail.extension)
                                                }
                                            }
                                        })}
                                },
                                Some(Err(e)) => rsx! { p { "Error loading data: {e}" } },
                                None => rsx! { p { class: "i-line-md:loading-twotone-loop p-8" } }
                            }
                        }
                    }
                }
            }
        }
    }
}
