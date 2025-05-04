use dioxus::{html::{area::href, g::rel}, prelude::*};
use crate::components::Hero;

/// The Home page component that will be rendered when the current route is `[Route::Home]`
#[component]
pub fn Home() -> Element {
    rsx! {
        document::Link { rel: "stylesheet", href: "/assets/tailwind.css" }

        Hero {}

    }
}
