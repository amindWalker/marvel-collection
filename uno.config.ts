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
    shortcuts: {
        "base-all": "all:transition-all duration-500"
    },
};
