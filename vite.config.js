import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
    build: {
        minify: true,
    },
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
            ssr: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        VitePWA({
            strategies: "generateSW", // default
            includeAssets: ["/assets/images/logo/colorful-logo.png"],
            manifest: {
                name: "JetStream",
                lang: "fa",
                start_url: '/',
                display: "standalone",
                background_color: "#00003e",
                theme_color: "#00003e",
                orientation: "portrait",
                dir: "rtl",
                short_name: "JetStream",
                description: "",
                icons: [
        // {
        //     src: "/assets/images/icons/pwa/homescreen48.png",
        //     sizes: "48x48",
        //     type: "image/png",
        // },
        // {
        //     src: "/assets/images/icons/pwa/homescreen72.png",
        //     sizes: "72x72",
        //     type: "image/png",
        // },
        // {
        //     src: "/assets/images/icons/pwa/homescreen96.png",
        //     sizes: "96x96",
        //     type: "image/png",
        // },
        // {
        //     src: "/assets/images/icons/pwa/homescreen144.png",
        //     sizes: "144x144",
        //     type: "image/png",
        // },
        // {
        //     src: "/assets/images/icons/pwa/homescreen168.png",
        //     sizes: "168x168",
        //     type: "image/png",
        // },
        // {
        //     src: "/assets/images/icons/pwa/homescreen192.png",
        //     sizes: "192x192",
        //     type: "image/png",
        // },
                ],
            },
        }),
    ],
    css: {
        postCss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },
    ssr: {
        noExternal: ["laravel-vite-plugin", "@inertiajs/server"],
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
        },
    },
});
