import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import VueDevTools from "vite-plugin-vue-devtools";

import { createHtmlPlugin } from "vite-plugin-html";

const makeUUID = () => {
    let dt = new Date().getTime();
    return "xxxxxx".replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

const version = process.env.npm_package_version as string + "-" + makeUUID();

export default defineConfig({
    base: "./",
    plugins: [
        vue(),
        vueJsx(),
        VueDevTools(),
        createHtmlPlugin({
            minify: true
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    esbuild: {
        pure: ["console.log"],
        drop: ["debugger"],
    },
    define: {
        "__APP_VERSION__": JSON.stringify(version),
    },
});
