import './bootstrap'
import {createSSRApp, h} from 'vue'
import {createInertiaApp} from '@inertiajs/inertia-vue3'
import {InertiaProgress} from '@inertiajs/progress'
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import {ZiggyVue} from "../../vendor/tightenco/ziggy/dist/vue.m";
import VueAxios from "vue-axios";
import vuetify from "./services/vuetify";
import vue3easyDataTable from 'vue3-easy-data-table'
import VueClipboard from 'vue3-clipboard'
import vue3jalaliMoment from 'vue3-jalali-moment'
import {VueEditor} from 'vue3-editor'
import VueViewer from 'v-viewer'

createInertiaApp({
    resolve: async name => await resolvePageComponent(`./Pages/${name}.vue`,
        import.meta.glob("./Pages/**/*.vue")),
    setup({el, App, props, plugin}) {
        createSSRApp({render: () => h(App, props)})
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(VueAxios, axios)
            .use(vuetify)
            .use(VueClipboard, {
                autoSetContainer: true,
                appendToBody: true,
            })
            .use(vue3jalaliMoment)
            .use(VueEditor)
            .use(VueViewer)
            .component('v-data-table', vue3easyDataTable)
            // .filter('format_bytes', function (bytes, decimals) {
            //     if (bytes === 0) return '0 Bytes';
            //     let k = 1000,
            //         dm = decimals + 1 || 3,
            //         sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            //         i = Math.floor(Math.log(bytes) / Math.log(k));
            //     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            // })
            .mount(el)
    },
})
InertiaProgress.init({color: "#27007c"})
