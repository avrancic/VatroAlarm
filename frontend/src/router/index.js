import { createRouter, createWebHistory } from 'vue-router'

import IncidentsPage from '../components/Admin/IncidentsPage.vue'

import VehiclesPage from '../components/Admin/Settings/VehiclesPage.vue'
import EmployeesPage from '../components/Admin/Settings/EmployeesPage.vue'
import EmployeesTypesPage from '../components/Admin/Settings/EmployeesTypesPage.vue'
import IncidentsTypesPage from '../components/Admin/Settings/IncidentsTypesPage.vue'

const routes = [
  {
    path: '/admin/incidents',
    name: 'AdminIncidents',
    component: IncidentsPage
  },
  {
    path: '/admin/settings/incidents_types',
    name: 'AdminSettingsIncidentsTypes',
    component: IncidentsTypesPage
  },  
  {
    path: '/admin/settings/vehicles',
    name: 'AdminSettingsVehicles',
    component: VehiclesPage
  },
  {
    path: '/admin/settings/employees',
    name: 'AdminSettingsEmployees',
    component: EmployeesPage
  },
  {
    path: '/admin/settings/employees_types',
    name: 'AdminSettingsEmployeesTypes',
    component: EmployeesTypesPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
