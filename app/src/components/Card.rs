use dioxus::prelude::*;
use dioxus_router::prelude::Link;

#[component]
pub fn Card(
    index: usize,
    link_to: &'static str,
    thumb: String,
    hero_name: String,
    comics_available: i64,
    backdrop_img: String,
) -> Element {
    let is_hover = use_signal(|| false);
    let is_loading = use_signal(|| false);

    rsx! {
        ul {
            class: "self-center bg-cover bg-center bg-no-repeat",
            style: "background-image: url('{backdrop_img}')",
            onpointerdown: move |_| {
                let mut is_hover = is_hover;
                is_hover.toggle()
            },
            onpointerup: move |_| {
                let mut is_hover = is_hover;
                is_hover.toggle()
            },
            figure {
                class: "grid max-w-64 m-0.5 animate-fade-in-right",
                style: "animation-delay: {index}00ms",
                figcaption {
                    class: "text-center p-4 rounded transition-opacity duration-300",
                    class: if *is_hover.read() { "opacity-100" } else { "opacity-0" },
                    p { class: "text-white", "{hero_name}" }
                }
                Link { to: link_to,
                    i {
                        class: "border-none outline-none appearance-none z-30 fixed m-2 ml-4 p-5 rounded-full hover:scale-110 transition-transform",
                        class: if *is_hover.read() { "opacity-100" } else { "opacity-0" },
                        class: "i-mdi-chevron-up-circle hover:invert",
                    }
                }
                img {
                    tabindex: "0",
                    class: "transition-all duration-300",
                    class: if *is_loading.read() { "animate-spin self-center p-8 bg-red-700" } else { "bg-white z-20 hovercard w-64 h-64 max-w-64 max-h-64" },
                    src: "{thumb}",
                    alt: "{hero_name}",
                    onfocusin: move |_| {
                        let mut is_hover = is_hover;
                        is_hover.toggle()
                    },
                    onfocusout: move |_| {
                        let mut is_hover = is_hover;
                        is_hover.toggle()
                    },
                }
                legend {
                    class: "z-10 bg-white text-center p-4 rounded transition-opacity duration-300",
                    class: if *is_hover.read() { "opacity-100" } else { "opacity-0" },
                    "Comics available: {comics_available}"
                }
            }
        }
    }
}