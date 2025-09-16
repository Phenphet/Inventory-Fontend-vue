import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/Layout/DefaultLayout.vue'
import LoginLayout from '@/Layout/LoginLayout.vue'

import LoginView from '@/views/LoginView.vue'
import DashbordView from '@/views/DashBordView.vue'
import ProductView from '../views/ProductView.vue'
import CategoryView from '../views/CategoryView.vue'
import WarehouseView from '../views/WarehouseView.vue'
import StockMovementView from '../views/StockMovementView.vue'
import ReportingView from '../views/ReportingView.vue'
import UserManagementView from '../views/UserManagementView.vue'


import StockInboundView from '../views/StockInboundView.vue'
import StockOutboundView from '../views/StockOutboundView.vue'
import StockTranferView from '../views/StockTranferView.vue'
import StockMovementHistoryView from '../views/StockMovementHistoryView.vue'

import { useLoginStore } from '@/stores/login'

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
          children: [
            {
              path: '',
              name: 'inbound',
              component: StockInboundView,
              meta: { requiresAuth: true }
            },
            {
              path: 'outbound',
              name: 'outbound',
              component: StockOutboundView,
              meta: { requiresAuth: true }
            },
            {
              path: 'tranfer',
              name: 'tranfer',
              component: StockTranferView,
              meta: { requiresAuth: true }
            },
            {
              path: 'histoymovement',
              name: 'histoymovement',
              component: StockMovementHistoryView,
              meta: { requiresAuth: true }
            },
          ],
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

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const loginStore = useLoginStore()

  const isAuthenticated = await loginStore.chechLogin(token)

  if(to.meta.requiresAuth && !isAuthenticated){
    next('/login')
  }else if(to.path === '/login' && isAuthenticated){
    next('/')
  }else{
    next()
  }
})

export default router