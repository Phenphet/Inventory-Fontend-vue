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
          component: DashbordView,
          meta: { requiresAuth: true }
        }
      ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/login' }
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if(to.meta.requiresAuth && !token){
    next('/login')
  }else if(to.path === '/login' && token){
    next('/')
  }else{
    next()
  }
})

export default router