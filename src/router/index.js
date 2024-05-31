import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/default/home.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'about',
          component: () => import('@/views/default/about.vue')
        }
      ]
    },
    {
      path: '/pubs',
      name: 'pubs',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'pubs',
          component: () => import('@/views/default/pubs.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/layouts/auth.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/auth/login.vue')
        }
      ]
    },
    {
      path: '/dashbord',
      name: 'dashboardLayout',
      component: () => import('@/layouts/dashboard.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/index.vue')
        }
      ]
    }
  ]
})

export default router
