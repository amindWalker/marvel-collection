// External depencendies
use dioxus::prelude::*;
// Local depencendies

pub fn Footer(cx: Scope) -> Element {
    // let attribution_text = ;
    cx.render(rsx! {
        div {
            class: "@apply absolute bottom-10 grid grid-cols-3 lg:grid-cols-6 w-full place-items-center",
            footer {
                class: "base-container col-start-1 lg:col-start-2 col-end-4 lg:col-end-6 auto-cols-fr auto-rows-min w-full grid",
                div {
                    class: "text-center",
                    a {
                        class: "text-white text-opacity-30 hover:text-red-700",
                        href: "https://marvel.com",
                        "Data provided by Marvel. © 2023 MARVEL"
                    }
                    p {class: "text-white text-opacity-30", "Made in Full Rust Stack"},
                    a {
                        class: "text-white text-opacity-30 hover:text-red-700",
                        href: "https://github.com/amindWalker",
                        "by Breno Rocha"
                    }
                    div { class: "grid grid-flow-col place-content-center m4 gap4 text-xl",
                        a { href: "https://github.com/amindWalker/marvel-collection", i { class: "i-carbon:logo-github invert opacity-30 hover:opacity-60" } }
                        a { href: "https://rust-lang.org", i { class: "i-mdi:language-rust invert opacity-30 hover:opacity-60" } }
                        a { href: "https://webassembly.org", i { class: "i-logos:webassembly brightness-[300%] scale-90 opacity-30 hover:opacity-60" } }
                        a { href: "https://dioxuslabs.com", i { class: "i-bx:dna invert opacity-30 hover:opacity-60" } }
                    }
                }
            }
        }
    })
}
