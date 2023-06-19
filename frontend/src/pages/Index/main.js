import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import map from 'vue3-openlayers'

createApp(App).use(map).mount('#app')