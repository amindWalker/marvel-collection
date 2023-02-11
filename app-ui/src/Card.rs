use dioxus::prelude::*;

use crate::types::Thumbnail;

pub fn Card(cx:Scope) -> Element {
    let hover_state = use_state(cx, || false);
    let MARVEL_API =
        // format!("{API_BASE_URL}/v1/public/characters?limit={100}&offset={1500}&ts=9&apikey={PUBLIC_KEY}&hash={HASH}");
        "http://192.168.1.130:5500/mock.json";
    let fetch_api = use_future(cx, (), |_| async move {
        gloo_net::http::Request::get(&MARVEL_API)
            .send()
            .await
            .unwrap()
            .json::<crate::types::MarvelRoot>()
            .await

    });
    let fetch_thumbs = match fetch_api.value() {
        Some(Ok(ref thumb)) => {
            log::error!("Error: something went wrong while fetching thumbails");
            let thumbs = thumb.data.results.iter().map(|hero| {
                // load_thumbs(hero.thumbnail)
            }).collect();
            thumbs
        },
        Some(Err(_err)) => {
            log::error!("Error: something went wrong while fetching thumbails");
            vec![]
        },
        _ => vec![],
    };
    cx.render(rsx! {
        match fetch_api.value() {
            Some(Ok(comic)) => {
                log::debug!("{hover_state}");
                rsx! {
                    div {
                        class: "@apply bg-red-700 h-full grid grid-flow-col p8 md:p16 xl:p32 overflow-hidden overflow-x-scroll",
                        comic.data.results.clone().iter().enumerate().map(|(i, hero)| {
                            // await with spinning animation until load_img finishes
                            let random = rand::random::<f32>() * 4.0 + 5.0;
                            let visible = if **hover_state {"1"} else {"0"};
                            rsx! {
                                picture {
                                    class: "@apply self-center hover:z1",
                                    figure {
                                        class: "@apply grid max-w-64 overflow-visible animate-fade-in-right",
                                        style: "transform: rotateZ({random}deg) scale(1.5); animation-delay: {i}00ms;",
                                        figcaption {
                                            class: "@apply text-center opacity-0 p4",
                                            style: "opacity: {visible};",
                                            p {class: "text-white", "{hero.name}"}
                                        }
                                        img {
                                            tabindex: "0",
                                            class: "hovercard w24vw h24vw max-w-64 max-h-64 bg-white",
                                            style: "animation-delay: {i}00ms;",
                                            src: "{hero.thumbnail.path}.{hero.thumbnail.extension}",
                                            onmouseenter: move |_| {
                                                let state = !hover_state;
                                                hover_state.set(state);
                                            },
                                            onmouseleave: move |_| {
                                                let state = !hover_state;
                                                hover_state.set(state);
                                            }
                                        },
                                    }
                                    legend {
                                        class: "hidden p8 bg-sky bg-opacity-50 max-w-max rounded-lg",
                                        "Comics avaiable: {hero.comics.available}" br {}
                                        "Collection: {hero.comics.collection_uri}" br{}
                                        "Returned: {hero.comics.returned}",
                                    }
                                }
                                if i == 0 {
                                    rsx! {
                                        div {
                                            class: "@apply absolute mt120 self-center justify-self-center w80% z0 border-b border-24 border-black blur-2xl"
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
            },
            Some(Err(_)) => rsx! { p { "Error while loading the database." } },
            _ => rsx! { p { "Can't connect to Marvel at this time." } }
        }
    })
}

async fn load_thumbs(thumbs: Thumbnail) -> Vec<&'static str> {
    // await every img load and return a collection of imgs
    let img_vec = vec![];

    img_vec
}