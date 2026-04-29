import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import { i18n } from './i18n/index.js'

import LoginView from './views/LoginView.vue'
import ResetPasswordView from './views/ResetPasswordView.vue'
import AppLayout from './views/AppLayout.vue'
import DashboardView from './views/DashboardView.vue'
import PropiedadesView from './views/PropiedadesView.vue'
import EstadisticasView from './views/EstadisticasView.vue'
import MensajesView from './views/MensajesView.vue'
import ResponderView from './views/ResponderView.vue'
import ConfiguracionView from './views/ConfiguracionView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginView },
    { path: '/reset-password', component: ResetPasswordView },
    { path: '/responder/:token', component: ResponderView },
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', component: DashboardView },
        { path: 'propiedades', component: PropiedadesView },
        { path: 'estadisticas', component: EstadisticasView },
        { path: 'mensajes', component: MensajesView },
        { path: 'configuracion', component: ConfiguracionView },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  const rememberMe = localStorage.getItem('rememberMe')

  if (token && rememberMe === 'false' && !sessionStorage.getItem('sessionOnly')) {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    localStorage.removeItem('rememberMe')
    return '/login'
  }

  if (to.meta.requiresAuth && !token) return '/login'
  if (to.meta.requiresAdmin && localStorage.getItem('role') !== 'ADMIN') return '/dashboard'
  if (to.path === '/login' && token) return '/' + (localStorage.getItem('prefPagina') || 'dashboard')
})

createApp(App).use(router).use(i18n).mount('#app')
