import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import map from 'vue3-openlayers'
import store from './store/index';

createApp(App).use(router).use(store).use(map).mount('#app')