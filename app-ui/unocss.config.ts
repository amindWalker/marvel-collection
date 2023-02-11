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
            fonts: {},
        }),
        presetUno(),
    ],
    shortcuts: {
        "main-container": "@apply all:transition-all all:duration-500",
        "hovercard": "border-2 xl:border-4 rounded hover:(border-red-700 brightness-150 -translate-y-2 drop-shadow-xl) focus:(border-red-700 brightness-150 -translate-y-2 drop-shadow-xl)",
    },
};
