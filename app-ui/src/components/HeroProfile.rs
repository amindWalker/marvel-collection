// External depencendies
use dioxus::prelude::*;
// Local depencendies
use crate::types::MarvelRoot;

pub fn HeroProfile(cx: Scope) -> Element {
    let api_data = use_shared_state::<MarvelRoot>(cx).unwrap();

    cx.render(rsx! {
        match api_data.read().clone() {
            comic => {
                rsx! {
                    div {
                        class: "@apply bg-blue h-full grid grid-flow-col p8 md:p16 xl:p32 overflow-hidden overflow-x-scroll",
                        comic.data.results.iter().enumerate().map(|(i, hero)| {
                            // blur
                            rsx! {
                                div {}
                            }
                        })
                    }
                }
            },
            _ => rsx! { p { "Error while loading the database." } },
        }
    })
}