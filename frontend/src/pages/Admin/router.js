import { createRouter, createWebHistory } from 'vue-router'

import AdminIncidentsPage from './views/IncidentsPage.vue'

import AdminVehiclesPage from './views/Settings/VehiclesPage.vue'
import AdminEmployeesPage from './views/Settings/EmployeesPage.vue'
import AdminEmployeesTypesPage from './views/Settings/EmployeesTypesPage.vue'
import AdminIncidentsTypesPage from './views/Settings/IncidentsTypesPage.vue'
import AdminUsersPage from './views/Settings/UsersPage.vue'

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
  },
  {
    path: '/admin/users',
    name: 'AdminSettingsUsers',
    component: AdminUsersPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
