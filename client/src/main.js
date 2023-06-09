import 'vue-good-table-next/dist/vue-good-table-next.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'vue-multiselect/dist/vue-multiselect.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import map from 'vue3-openlayers'
import store from './store/index';
import VueGoodTablePlugin from 'vue-good-table-next';
import Multiselect from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App)
    .use(router)
    .use(store)
    .component('multiselect', Multiselect)
    .component('VueDatePicker', VueDatePicker)
    .use(VueGoodTablePlugin)
    .use(map).mount('#app')