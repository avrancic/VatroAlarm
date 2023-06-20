import 'vue-good-table-next/dist/vue-good-table-next.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import map from 'vue3-openlayers'
import store from './store/index';
import VueGoodTablePlugin from 'vue-good-table-next';

createApp(App)
    .use(router)
    .use(store)
    .use(VueGoodTablePlugin)
    .use(map).mount('#app')