import { createRouter, createWebHistory } from 'vue-router'
import VehiclesView from '../components/VehiclesView.vue'

const routes = [
  {
    path: '/vehicles',
    name: 'vehicles',
    component: VehiclesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
