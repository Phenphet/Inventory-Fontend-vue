<script setup>
    import { ref } from 'vue' 
    import { useRouter } from 'vue-router'
    import { useLoginStore } from '../stores/login'


    import Swal from 'sweetalert2'

    const router = useRouter()
    const loginStore = useLoginStore()

    const fromData = ref({
        email: '',
        password: ''
    })

    const submitFrom = async () => {
        console.log(fromData.value)
        if (fromData.value.email !== '' && fromData.value.password !== ''){
            await loginStore.login(fromData.value)
            fromData.value.email = ''
            fromData.value.password = ''
            router.push('/')
            Swal.fire({
                icon: 'success',
                text: 'Login Success',
                timer: 2000
            })
            
        }
    }
</script>

<template>
    <main class="login-page" style="min-height: 495.6px;">
        <div class="login-box">
            <div class="login-logo">
                <a href="#"><b>Admin</b>LTE</a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Sign in to start your session</p>

                    <form @submit.prevent="submitFrom()">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email" v-model="fromData.email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Password" v-model="fromData.password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="remember" disabled>
                                    <label for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <p class="mb-1">
                        <a href="#">I forgot my password</a>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
    </main>
</template>