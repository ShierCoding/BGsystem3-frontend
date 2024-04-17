import useConfig from "@/core/conf";
import { defineStore } from "pinia";
import colorUtils from "@/core/colorUtils";

const themeColor = {
    backgroundColor: {
        dark: "#000",
        light: "#fff",
    },
    fontColor: {
        dark: "#fff",
        light: "#000",
    },
};

export const useTheme = defineStore("theme", {
    state() {
        return {
            theme: "dark",
            backgroundColor: themeColor.backgroundColor.dark,
            fontColor: themeColor.fontColor.dark,
        };
    },
    getters: {
    },
    actions: {
        setTheme(theme: "dark" | "light") {
            this.backgroundColor = theme === "dark" ? themeColor.backgroundColor.dark : themeColor.backgroundColor.light;
            this.fontColor = theme === "dark" ? themeColor.fontColor.dark : themeColor.fontColor.light;
        },

        opacity(instance: string, alpha: number) {
            const { r, g, b } = colorUtils.parseHexColor(instance);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        },
    }
});


(async () => {
    const config = await useConfig();
    const theme = useTheme();

    theme.backgroundColor = config.style.color[config.style.theme].back;
    theme.fontColor = config.style.color[config.style.theme].font;
    theme.theme = config.style.theme;

})();