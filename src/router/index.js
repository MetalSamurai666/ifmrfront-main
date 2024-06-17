import menu from '@/helpers/menu/main'
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
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/default/about.vue')
        },
        {
          path: 'pubs',
          name: 'pubs',
          component: () => import('@/views/default/pubs.vue')
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('@/views/default/news.vue')
        },
        {
          path: 'publish',
          name: 'publish',
          component: () => import('@/views/default/publish.vue')
        },
        {
          path: 'contacts',
          name: 'contacts',
          component: () => import('@/views/default/contacts.vue')
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
      path: '/dashboard',
      name: 'dashboardLayout',
      component: () => import('@/layouts/dashboard.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/index.vue')
        },
        ...menu
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router
