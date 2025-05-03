<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useLoginStore } from '../stores/login'
import { useRouter } from 'vue-router'

import Swal from 'sweetalert2'

const useLogin = useLoginStore()
const router = useRouter()
const fullname = ref('')

const clickLogout =  () => {
  Swal.fire({
    title: "Confirm",
    text: "Logout confirm!",
    icon: "question",
    showCancelButton: true,
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  }).then(async(result) => {
    if (result.isConfirmed) {
      await useLogin.logout()
      router.push('/login')
    } else {
      console.log("User canceled")
    }
  })

}

onMounted(() => {
  getfullname()
})

const getfullname = () => {
  fullname.value = localStorage.getItem('fullname')
}


</script>
<template>
  <main>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <RouterLink to="" class="brand-link">
        <img src="../assets/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
          style="opacity: .8">
        <span class="brand-text font-weight-light">AdminLTE 3</span>
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
            <li class="nav-item">
              <RouterLink to="/product" class="nav-link" :class="$route.path === '/product' ? 'active' : ''">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Product Management
                </p>
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/category" class="nav-link" :class="$route.path === '/category' ? 'active' : ''">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Category Management
                </p>
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/warehouse" class="nav-link" :class="$route.path === '/warehouse' ? 'active' : ''">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Warehouse / Location Management
                </p>
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/stock" class="nav-link" :class="$route.path === '/stock' ? 'active' : ''">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Stock Movement
                </p>
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/report" class="nav-link" :class="$route.path === '/report' ? 'active' : ''">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Reporting & Alerts
                </p>
              </RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/user" class="nav-link" :class="$route.path === '/user' ? 'active' : ''">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  User Management
                </p>
              </RouterLink>
            </li>

            <!-- <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon far fa-plus-square"></i>
                <p>
                  Extras
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      Login & Register v1
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="pages/examples/login.html" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Login v1</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="pages/examples/register.html" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Register v1</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="pages/examples/forgot-password.html" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Forgot Password v1</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="pages/examples/recover-password.html" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Recover Password v1</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>
                      Login & Register v2
                      <i class="fas fa-angle-left right"></i>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item">
                      <a href="pages/examples/login-v2.html" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Login v2</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="pages/examples/register-v2.html" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Register v2</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="pages/examples/forgot-password-v2.html" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Forgot Password v2</p>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a href="pages/examples/recover-password-v2.html" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Recover Password v2</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a href="pages/examples/lockscreen.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Lockscreen</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="pages/examples/legacy-user-menu.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Legacy User Menu</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="pages/examples/language-menu.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Language Menu</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="pages/examples/404.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Error 404</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="pages/examples/500.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Error 500</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="pages/examples/pace.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pace</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="pages/examples/blank.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Blank Page</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="starter.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Starter Page</p>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-search"></i>
                <p>
                  Search
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="pages/search/simple.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Simple Search</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="pages/search/enhanced.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Enhanced</p>
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-header">MISCELLANEOUS</li>

            <li class="nav-item">
              <a href="https://adminlte.io/docs/3.1/" class="nav-link">
                <i class="nav-icon fas fa-file"></i>
                <p>Documentation</p>
              </a>
            </li> -->
            <li class="nav-header">LOGOUT</li>
            <li class="nav-item">
              <button class=" btn btn-danger text-white custom-btn " @click="clickLogout()">
                <i class="nav-icon fas fa-right-from-bracket" style="color: white;"></i>
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
  </main>
</template>

<style scoped>
.custom-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-btn p {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>