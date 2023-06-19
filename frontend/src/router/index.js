import { createRouter, createWebHistory } from 'vue-router'

import LoginMainView from '@/views/LoginMainView.vue'
import DisplayMainView from '@/views/DisplayMainView.vue'

import AdminMainView from '@/views/AdminMainView.vue'
import AdminIncidentsChildView from '@/views/AdminIncidentsChildView.vue'
import AdminSettingsVehiclesChildView from '@/views/AdminSettingsVehiclesChildView.vue'
import AdminSettingsEmployeesChildView from '@/views/AdminSettingsEmployeesChildView.vue'
import AdminSettingsEmployeesTypesChildView from '@/views/AdminSettingsEmployeesTypesChildView.vue'
import AdminSettingsIncidentsTypesChildView from '@/views/AdminSettingsIncidentsTypesChildView.vue'
import AdminSettingsUsersChildView from '@/views/AdminSettingsUsersChildView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginMainView,
  },
  {
    path: '/display',
    name: 'Display',
    component: DisplayMainView,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminMainView,
    children: [
        { path: 'incidents', name:'AdminIncidents', component: AdminIncidentsChildView },
        { path: 'settings/vehicles', name:'AdminSettingsVehicles', component: AdminSettingsVehiclesChildView },
        { path: 'settings/employees', name:'AdminSettingsEmployees', component: AdminSettingsEmployeesChildView },
        { path: 'settings/employees_types', name:'AdminSettingsEmployeesTypes', component: AdminSettingsEmployeesTypesChildView },
        { path: 'settings/incidents_types', name:'AdminSettingsIncidentsTypes', component: AdminSettingsIncidentsTypesChildView },
        { path: 'settings/users', name:'AdminSettingsUsers', component: AdminSettingsUsersChildView },
      ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router