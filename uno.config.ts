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
            "all:(transition-all duration-300 animate-duration-300 animate-fade-in)",
    },
};
