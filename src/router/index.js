import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/Layout/DefaultLayout.vue'
import LoginLayout from '@/Layout/LoginLayout.vue'

import DashbordView from '@/views/DashbordView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: LoginLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginView
        }
      ]
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'dashbord',
          component: DashbordView
        }
      ]
    }
  ],
})

export default router