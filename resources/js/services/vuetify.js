import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {fa} from 'vuetify/locale'
import {aliases, mdi} from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.min.css'

export default createVuetify({
    ssr: true,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
    locale: {
        locale: 'fa',
        fallback: 'fa',
        rtl: {
            fa: true,
        },
        messages: {fa}
    },
    components,
    directives,
})
