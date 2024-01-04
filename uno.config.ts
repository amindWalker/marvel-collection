import {
    presetIcons,
    presetTypography,
    presetWebFonts,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";

export default {
    presets: [
        presetIcons({
            scale: 1,
            extraProperties: {
                display: "inline-block",
            },
        }),
        presetTypography(),
        presetWebFonts({
            provider: "google",
            fonts: {
                sans: ["Montserrat:900"],
                mono: ["Saira Stencil One:400"],
            },
        }),
        presetUno(),
    ],
    transformers: [transformerVariantGroup(), transformerDirectives()],
    shortcuts: {
        "base-all":
            "all:(transition-all duration-300 animate-duration-300 ease-in-out animate-ease-in-out outline-none border-none appearance-none font-sans)",
        "outer-panel":
            "rounded-lg ring ring-white ring-opacity-25 p-8 m-4 shadow-2xl bg-white bg-opacity-25",
        "inner-panel":
            "rounded-lg ring ring-white ring-opacity-25 p-4 shadow-md bg-white bg-opacity-10",
        "outer-dialog":
            "rounded-2xl ring ring-white ring-opacity-50 p-8 m-4 shadow-lg bg-white bg-opacity-50",
        "inner-dialog":
            "rounded-2xl ring ring-white ring-opacity-50 p-0 shadow-lg bg-white bg-opacity-10",
        btn: "rounded-lg p-4 m-4 bg-red-7 hover:(bg-white text-red-600)",
        "card-profile-img":
            "animate-fade-in w-64 h-64 rounded-lg hover:(outline-red-600 brightness-125 -translate-y-2) focus:(outline-red-600 brightness-125 -translate-y-2)",
        "backdrop-bg":
            "absolute bg-transparent inset-0 w-100vw h-100vh backdrop-contrast-5",
        "std-text": "text-dark-1",
    },
};
