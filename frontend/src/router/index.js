import { createRouter, createWebHistory } from 'vue-router'

import AdminIncidentsPage from '../views/Admin/IncidentsPage.vue'

import AdminVehiclesPage from '../views/Admin/Settings/VehiclesPage.vue'
import AdminEmployeesPage from '../views/Admin/Settings/EmployeesPage.vue'
import AdminEmployeesTypesPage from '../views/Admin/Settings/EmployeesTypesPage.vue'
import AdminIncidentsTypesPage from '../views/Admin/Settings/IncidentsTypesPage.vue'

const routes = [
  {
    path: '/admin/incidents',
    name: 'AdminIncidents',
    component: AdminIncidentsPage
  },
  {
    path: '/admin/settings/incidents_types',
    name: 'AdminSettingsIncidentsTypes',
    component: AdminIncidentsTypesPage
  },  
  {
    path: '/admin/settings/vehicles',
    name: 'AdminSettingsVehicles',
    component: AdminVehiclesPage
  },
  {
    path: '/admin/settings/employees',
    name: 'AdminSettingsEmployees',
    component: AdminEmployeesPage
  },
  {
    path: '/admin/settings/employees_types',
    name: 'AdminSettingsEmployeesTypes',
    component: AdminEmployeesTypesPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
