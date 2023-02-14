use dioxus::prelude::*;
use dioxus_router::Link;
use crate::api_service::*;

pub fn Card(cx: Scope) -> Element {
    let limit = pagination(cx).read_limit();
    cx.render(rsx! {
        match root_api(cx) {
            Ok(comic) => {
                rsx! {
                    div {
                        class: "@apply -rotate-2 self-center min-h-max grid grid-flow-col overflow-x-scroll",
                        header { class: "grid",
                            h1 {
                                class: "text-center self-center -rotate-90 font-sans text-white text-6xl animate-pulse animate-ease-in-out", "CHOOSE " br{}
                                sup {class: "text-3xl", "YOUR HERO"}
                            }
                        }
                        comic.data.results.clone().iter().enumerate().map(|(i, hero)| {
                            let hover_state = use_state(cx, || false); // moved use_state here since key does not work as expected
                            let opacity = if **hover_state {"1"} else {"0"};
                            let key = hero.id;
                            let thumb = format!("{}.{}", hero.thumbnail.path, hero.thumbnail.extension);
                            let thumb = if thumb == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" {"".to_string()} else {thumb};
                            rsx! {
                                picture {
                                    class: "@apply self-center",
                                    key: "{key}",
                                    onmouseenter: move |_| {
                                        let state = !hover_state;
                                        hover_state.set(state);
                                    },
                                    onmouseleave: move |_| {
                                        let state = !hover_state;
                                        hover_state.set(state);
                                    },
                                    figure {
                                        class: "@apply grid max-w-64 m-0.5 overflow-visible animate-fade-in-right",
                                        style: "animation-delay: {i}00ms;",
                                        figcaption {
                                            class: "@apply text-center p4",
                                            style: "opacity: {opacity};",
                                            p {class: "text-white", "{hero.name}"}
                                        }
                                        Link {
                                            to: "/hero",
                                            i {
                                                class: "@apply i-mdi:chevron-up-circle z2 hover:bg-white fixed m2 ml4 p5 rounded-full border-none outline-none appearance-none",
                                                style: "opacity: {opacity};"
                                            },
                                        }
                                        img {
                                            autofocus: if i == 0 {"true"} else {"false"},
                                            tabindex: "0",
                                            class: "@apply z1 hovercard w64 h64 max-w-64 max-h-64",
                                            style: "animation-delay: {i}00ms;",
                                            src: "{thumb}",
                                            alt: "{hero.name}",
                                            onfocus: move |_| {
                                                let state = !hover_state;
                                                hover_state.set(state);
                                            },
                                            onblur: move |_| {
                                                let state = !hover_state;
                                                hover_state.set(state);
                                            },
                                        },
                                        legend {
                                            class: "@apply bg-white text-center opacity-0 p4 rounded",
                                            style: "opacity: {opacity};",
                                            "Comics avaiable: {hero.comics.available}"
                                        }
                                    }
                                    if i == limit as usize -1 {
                                        let size = i * 17;
                                        rsx! {
                                            div {
                                                class: "@apply absolute left-0 self-center justify-self-center border-b border-16 border-black blur-2xl",
                                                style: "width: {size}rem;",
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    }
                }
            },
            Err(_) => rsx! { p { "Error while loading the database." } },
        }
    })
}
