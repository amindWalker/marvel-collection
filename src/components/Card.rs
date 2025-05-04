use dioxus::prelude::*;
use dioxus_router::prelude::Link;

#[component]
pub fn Card() -> Element {
    rsx! {
        section { class: "max-w-md bg-red-400", "Card" }
    }
}