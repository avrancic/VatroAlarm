import { createRouter, createWebHistory } from 'vue-router'

import LoginMainView from '@/views/LoginMainView.vue'
import DisplayMainView from '@/views/DisplayMainView.vue'

import AdminMainView from '@/views/AdminMainView.vue'
import AdminIncidentsChildView from '@/views/AdminIncidentsChildView.vue'
import AdminSettingsVehiclesChildView from '@/views/AdminSettingsVehiclesChildView.vue'
import AdminSettingsEmployeesChildView from '@/views/AdminSettingsEmployeesChildView.vue'
import AdminSettingsUsersChildView from '@/views/AdminSettingsUsersChildView.vue'

const authGuard = (to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
};

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
    beforeEnter: authGuard
  },
  {
    path: '/',
    name: 'Admin',
    component: AdminMainView,
    beforeEnter: authGuard,
    children: [
        { path: 'incidents', name:'AdminIncidents', component: AdminIncidentsChildView },
        { path: 'vehicles', name:'AdminSettingsVehicles', component: AdminSettingsVehiclesChildView },
        { path: 'employees', name:'AdminSettingsEmployees', component: AdminSettingsEmployeesChildView },
        { path: 'users', name:'AdminSettingsUsers', component: AdminSettingsUsersChildView },
      ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router