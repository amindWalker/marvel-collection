import {
    presetIcons,
    presetTypography,
    presetWebFonts,
    presetUno,
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
    // @apply
    shortcuts: {
        "base-all":
            "all:(transition-all duration-300 animate-duration-300 ease-in-out animate-ease-in-out outline-none border-none appearance-none)",
            "card-profile-img": "w-64 h-64 rounded hover:(outline-red-600 brightness-125 -translate-y-2) focus:(outline-red-600 brightness-125 -translate-y-2)"
    },
};
