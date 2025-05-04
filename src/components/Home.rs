use crate::{api_service::fetch_marvel_data, components::Card};
use dioxus::prelude::*;

#[component]
pub fn  Home() -> Element {
    rsx! {
        section { class: "flex w-fit bg-blue-100", "Home" }
    }
}
