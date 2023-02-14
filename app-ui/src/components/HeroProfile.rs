use dioxus::prelude::*;
use crate::{api_service::root_api};

pub fn HeroProfile(cx: Scope) -> Element {
    cx.render(rsx! {
        match root_api(cx) {
            Ok(comic) => {
                rsx! {
                    div {
                        class: "@apply bg-blue h-full grid grid-flow-col p8 md:p16 xl:p32 overflow-hidden overflow-x-scroll",
                        comic.data.results.iter().enumerate().map(|(i, hero)| {
                            // blur
                            rsx! {
                                div {
                                    // class: "@apply bg-white text-center opacity-0 p4 rounded",
                                    // style: "opacity: {opacity};",
                                    // "Comics avaiable: {hero.comics.available}"
                                    // "Collection: {hero.comics.collection_uri}" br{}
                                    // "Returned: {hero.comics.returned}",
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