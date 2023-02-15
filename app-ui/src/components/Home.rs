use dioxus::prelude::*;

use crate::{components::Card};
use crate::api_service::*;

pub fn Home(cx: Scope) -> Element {

    cx.render(rsx! {
        main {
            class: "@apply base-container grid overflow-hidden",
            body {
                class: "overflow-y-hidden",
                section {
                    class: "grid grid-flow-col h100vh",
                    // search
                    form {
                        class: "absolute w-full max-h-xs",
                        div {
                            class: "self-center grid mt24 place-items-center",
                            input {
                                class: "p4 rounded-xl",
                                r#type: "search",
                            }
                            button {class: "p4 i-line-md:search-twotone justify-self-start"}
                        }
                    }

                    article {
                        class: "@apply grid overflow-y-hidden bg-red-700",
                        match root_api(cx) {
                            Ok(_) => rsx! {
                                Card {}
                            },
                            Err(_) => rsx! { p { "Waiting the database. If its taking too long wait a few minutes and try again." } },
                        }
                    }
                }
            }
        }
    })
}