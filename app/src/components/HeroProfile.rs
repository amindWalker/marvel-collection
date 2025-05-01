use dioxus::prelude::*;
use crate::types::CharactersRoot;

#[component]
pub fn HeroProfile(id: usize) -> Element {
    let characters = use_context::<Signal<Option<CharactersRoot>>>();

    rsx! {
        div {
            class: "bg-blue-900 h-full grid grid-flow-col p-8 md:p-16 xl:p-32 overflow-x-auto",
            match &*characters.read() {
                Some(data) => rsx! {
                    {data.data.results.iter().enumerate().map(|(i, hero)| {
                        rsx! {
                            div {
                                key: "{hero.id}",
                                class: "snap-center min-w-[80vw] md:min-w-[60vw] xl:min-w-[40vw] p-8 backdrop-blur-lg bg-white/10 rounded-lg shadow-xl mx-4",

                                // Hero thumbnail
                                img {
                                    src: "{hero.thumbnail.path}.{hero.thumbnail.extension}",
                                    class: "w-full h-64 object-cover rounded-t-lg",
                                    alt: "Thumbnail of {hero.name}",
                                }

                                // Hero details
                                div {
                                    class: "p-4 space-y-4",
                                    h2 {
                                        class: "text-3xl font-bold text-white",
                                        "{hero.name}"
                                    }

                                    // Biography section
                                    div {
                                        class: "space-y-2",
                                        h3 {
                                            class: "text-xl text-white/80",
                                            "Biography"
                                        }
                                        p {
                                            class: "text-white/60",
                                            "{hero.description}"
                                        }
                                    }

                                    // Comics section
                                    div {
                                        class: "space-y-2",
                                        h3 {
                                            class: "text-xl text-white/80",
                                            "Comics Appearance"
                                        }
                                        div {
                                            class: "grid grid-cols-2 gap-2",
                                            {hero.comics.items.iter().take(4).map(|comic| {
                                                rsx! {
                                                    div {
                                                        class: "bg-white/10 p-2 rounded",
                                                        p {
                                                            class: "text-white/80 truncate",
                                                            "{comic.name}"
                                                        }
                                                    }
                                                }
                                            })}
                                        }
                                    }

                                    // Back button
                                    Link {
                                        to: "/home",
                                        class: "inline-block mt-4 px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors",
                                        "Back to Heroes"
                                    }
                                }
                            }
                        }
                    }
                    )}
                },
                None => rsx! {
                    div {
                        class: "flex justify-center items-center h-full",
                        i { class: "i-line-md:loading-twotone-loop text-4xl text-white" }
                    }
                }
            }
        }
    }
}