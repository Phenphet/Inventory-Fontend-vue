<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoginStore } from '../stores/login'
import { useRouter } from 'vue-router'
import { jwtDecode } from "jwt-decode";

import Swal from 'sweetalert2'

const useLogin = useLoginStore()
const router = useRouter()
const fullname = ref('')

const clickLogout = () => {
  Swal.fire({
    title: "Confirm",
    text: "คุณต้องการออกจากระบบ?",
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "ยกเลิก",
    confirmButtonText: "ตกลง",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await useLogin.logout()
      router.push('/login')
    } else {
      console.log("User canceled")
    }
  })

}

onMounted(() => {
  const decode = jwtDecode(localStorage.getItem("token"))
  fullname.value = decode.fullname
})

</script>
<template>
  <main>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <RouterLink to="" class="brand-link">
        <img src="../assets/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
          style="opacity: .8">
        <span class="brand-text font-weight-light">ERD Management</span>
      </RouterLink>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src="../assets/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <RouterLink to="/user" class="d-block">{{ fullname }}</RouterLink>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-header">MENU</li>
            <li class="nav-item">
              <RouterLink to="/" class="nav-link" :class="$route.path === '/' ? 'active' : ''">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </RouterLink>
            </li>
            <li class="nav-header">PRODUCTMENU</li>
            <li class="nav-item">
              <RouterLink to="/product" class="nav-link" :class="$route.path === '/product' ? 'active' : ''">
                <i class="nav-icon fa-brands fa-product-hunt"></i>
                <p>
                  Product Management
                </p>
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/category" class="nav-link" :class="$route.path === '/category' ? 'active' : ''">
                <i class="nav-icon fa-solid fa-table-list"></i>
                <p>
                  Category Management
                </p>
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/warehouse" class="nav-link" :class="$route.path === '/warehouse' ? 'active' : ''">
                <i class="nav-icon fa-solid fa-warehouse"></i>
                <p>
                  Warehouse / Location Management
                </p>
              </RouterLink>
            </li>

            <li class="nav-header">STOCKMENU</li>

            <li class="nav-item">
              <RouterLink to="/stock/" class="nav-link" :class="['/stock', '/stock/'].includes($route.path) ? 'active' : ''">
                <i class="fa-solid fa-arrow-trend-up nav-icon"></i>
                    <p>Inbound</p>
              </RouterLink>
            </li>

            <li class="nav-item">
               <RouterLink to="/stock/outbound" class="nav-link"  :class="$route.path === '/stock/outbound' ? 'active' : ''">
                    <i class="fa-solid fa-arrow-trend-down nav-icon"></i>
                    <p>Outbound</p>
                </RouterLink>
            </li>

             <li class="nav-item">
                <RouterLink to="/stock/tranfer" class="nav-link" :class="$route.path === '/stock/tranfer' ? 'active' : ''">
                    <i class="fa-solid fa-money-bill-transfer nav-icon"></i>
                    <p>Transfer</p>
                  </RouterLink>
            </li>

            <li class="nav-header">USERMENU</li>

            <li class="nav-item">
              <RouterLink to="/user" class="nav-link" :class="$route.path === '/user' ? 'active' : ''">
                <i class="nav-icon fa-solid fa-user"></i>
                <p>
                  User Management
                </p>
              </RouterLink>
            </li>
            
            <li class="nav-header">LOGOUT</li>
            <li class="nav-item">
              <a class=" custom-btn nav-link " @click="clickLogout()">
                <i class="nav-icon fas fa-right-from-bracket"></i>
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
  </main>
</template>
