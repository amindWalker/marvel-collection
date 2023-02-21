// External depencendies
use dioxus::prelude::*;
use dioxus_router::Link;
// Local depencendies

#[inline_props]
pub fn Card(
    cx: Scope,
    key: i64,
    index: usize,
    link_to: &'static str,
    thumb: String,
    hero_name: String,
    comics_available: i64,
    backdrop_img: String,
) -> Element {
    let is_hover = use_state(cx, || false);
    let opacity = if **is_hover {"1"} else {"0"};

    cx.render(rsx!(
        ul {
            key: "{key}",
            class: "@apply self-center bg-[url({backdrop_img})]",
            style: "list-style-type: none;",
            onpointerdown: move |_| {
                let state = !is_hover;
                is_hover.set(state);
            },
            onpointerup: move |_| {
                let state = !is_hover;
                is_hover.set(state);
            },
            figure {
                class: "grid max-w-64 m-0.5 animate-fade-in-right",
                style: "animation-delay: {index}00ms;",
                figcaption {
                    class: " text-center p4",
                    style: "opacity: {opacity};",
                    p {class: "text-white", "{hero_name}"}
                }
                Link {
                    to: link_to,
                    i {
                        class: " i-mdi:chevron-up-circle z3 hover:bg-white fixed m2 ml4 p5 rounded-full border-none outline-none appearance-none",
                        style: "opacity: {opacity};"
                    },
                }
                img {
                    id: "imgload",
                    tabindex: "0",
                    class: if !true {"i-line-md:loading-twotone-loop p8 self-center bg-red-700"}
                    else {"bg-white z2 hovercard w64 h64 max-w-64 max-h-64"},
                    style: "animation-delay: {index}00ms;",
                    src: "{thumb}",
                    alt: "{hero_name}",
                    onfocusin: move |_| {
                        let state = !is_hover;
                        is_hover.set(state);
                    },
                    onfocusout: move |_| {
                        let state = !is_hover;
                        is_hover.set(state);
                    },
                },
                legend {
                    class: " z1 bg-white text-center opacity-0 p4 rounded",
                    style: "opacity: {opacity};",
                    "Comics avaiable: {comics_available}"
                }
            }
        }
    ))
}
