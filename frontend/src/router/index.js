import { createRouter, createWebHistory } from 'vue-router'
import VehiclesView from '../components/VehiclesView.vue'
import EmployeesView from '../components/EmployeesView.vue'

const routes = [
  {
    path: '/vehicles',
    name: 'vehicles',
    component: VehiclesView
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
