import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/Layout/DefaultLayout.vue'
import LoginLayout from '@/Layout/LoginLayout.vue'

import LoginView from '@/views/LoginView.vue'
import DashbordView from '@/views/DashbordView.vue'
import ProductView from '../views/ProductView.vue'
import CategoryView from '../views/CategoryView.vue'
import WarehouseView from '../views/WarehouseView.vue'
import StockMovementView from '../views/StockMovementView.vue'
import ReportingView from '../views/ReportingView.vue'
import UserManagementView from '../views/UserManagementView.vue'


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
        },
        {
          path: 'product',
          name: 'product',
          component: ProductView,
          meta: { requiresAuth: true }
        },
        {
          path: 'category',
          name: 'category',
          component: CategoryView,
          meta: { requiresAuth: true }
        },
        {
          path: 'warehouse',
          name: 'warehouse',
          component: WarehouseView,
          meta: { requiresAuth: true }
        },
        {
          path: 'stock',
          name: 'stockmovement',
          component: StockMovementView,
          meta: { requiresAuth: true }
        },
        {
          path: 'report',
          name: 'reporting',
          component: ReportingView,
          meta: { requiresAuth: true }
        },
        {
          path: 'user',
          name: 'usermanagement',
          component: UserManagementView,
          meta: { requiresAuth: true }
        },
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