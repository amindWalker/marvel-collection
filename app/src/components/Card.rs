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
    let mut is_hover = use_signal(|| false);
    let opacity = if is_hover.cloned() { "1" } else { "0" };
    let is_loading = use_signal(|| false);

    rsx! {
        ul {
            class: "self-center bg-[url('{backdrop_img}')]",
            onpointerdown: move |_| is_hover.toggle(),
            onpointerup: move |_| is_hover.toggle(),
            figure {
                class: "grid max-w-64 m-0.5 animate-fade-in-right animation-delay-{index}00",
                // style: "animation-delay: {index}00ms;",
                figcaption {
                    class: "text-center p4 opacity-{opacity} rounded",
                    // style: "opacity: {opacity};",
                    p { class: "text-white", "{hero_name}" }
                }
                Link {
                    to: link_to,
                    i {
                        class: "border-none outline-none appearance-none i-mdi:chevron-up-circle z3 hover:invert fixed m2 ml4 p5 rounded-full opacity-{opacity} hover:scale-110",
                        // style: "opacity: {opacity};"
                    }
                }
                img {
                    tabindex: "0",
                    class: if is_loading.cloned() {
                        "i-line-md:loading-twotone-loop p8 self-center bg-red-700"
                    } else {
                        "bg-white z2 hovercard w64 h64 max-w-64 max-h-64"
                    },
                    src: "{thumb}",
                    alt: "{hero_name}",
                    onfocusin: move |_| is_hover.toggle(),
                    onfocusout: move |_| is_hover.toggle()
                }
                legend {
                    class: "z1 bg-white text-center opacity-0 p4 rounded opacity-{opacity}",
                    // style: "opacity: {opacity};",
                    "Comics available: {comics_available}"
                }
            }
        }
    }
}
