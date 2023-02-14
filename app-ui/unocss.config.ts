import {
    presetIcons,
    presetTypography,
    presetWebFonts,
    presetUno,
} from "unocss";

export default {
    presets: [
        presetIcons({
            scale: 1.25,
            extraProperties: {
                display: "inline-block",
            },
        }),
        presetTypography(),
        presetWebFonts({
            provider: "google",
            fonts: {
                sans: ["Montserrat:900"],
            },
        }),
        presetUno(),
    ],
    shortcuts: {
        "main-container": "@apply all:(transition-all duration-500 border-none outline-none ease-in-out animate-ease-in-out)",
        "hovercard": "opacity-50 rounded-lg hover:(outline-red-600 opacity-100 brightness-125 -translate-y-2) focus:(outline-red-600 opacity-100 brightness-125 -translate-y-2)",
    },
};
