<script setup>
    import { ref, reactive, onMounted } from 'vue'

    import { useUserStore } from '@/stores/user.js'

    import Modal from '@/components/Modal.vue'

    const userStore = useUserStore()
    const statusModel = ref('create')
    const chechBox = ref(false)
    const formData = reactive({
        fullname: '',
        email: '',
        password: '',
        role: ''
    })
    
    const btnAdd = () => {}
    const saveData = () => {
        console.log(formData.role) 
    }
    const btnEdit = () => {}
    const editData = () => {}

    onMounted(() => {
        userStore.getData()
    })

    console.log(chechBox)
</script>

<template>
    <main>
        <div class="content-header">
            <div class="container-fluid">
                <h1>UserManagement</h1>
            </div>
        </div>

        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header row">
                                <h3 class="card-title col-sm-10 pt-2">Table User All </h3>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#add"
                                        >Add User</button>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                    <div class="row">
                                        <div class="col-sm-12 table-responsive">
                                            <table class="table table-bordered table-hover dataTable dtr-inline "
                                                role="grid">
                                                <thead>
                                                    <tr role="row">
                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Browser: activate to sort column ascending">
                                                            Fullname</th>
                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Browser: activate to sort column ascending">
                                                            Email</th>
                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Browser: activate to sort column ascending">
                                                            Role</th>
                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Browser: activate to sort column ascending"></th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="" v-for="items in userStore.userData">
                                                        <td>{{ items.fullname }}</td>
                                                        <td>{{ items.email }}</td>
                                                        <td>{{ items.role }}</td>
                                                       
                                                        <td class="text-sm-center">
                                                            <button type="button" class="btn btn-warning mx-1"
                                                                data-toggle="modal" data-target="#edit"
                                                                @click="">
                                                                <i class="fa-solid fa-pen-to-square"> แก้ไข</i>
                                                            </button>
                                                            <button class="btn btn-danger mx-2"
                                                                @click="">
                                                                <i class="fa-solid fa-trash"> ลบข้อมูล</i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!-- /.col -->
                </div>
            </div>
        </section>

        <Modal :titleModal="statusModel === 'create' ? 'Add User' : 'Update User'" :idModal="statusModel === 'create' ? 'add' : 'edit' " :btn-name="statusModel === 'create' ? 'Save Data': 'Edit Data'" :functions="statusModel === 'create' ? saveData : updateData">
            <div class="form-group">
                <div class="form-group">
                    <label for="exampleInputRounded0">User Fullname</label>
                    <input type="text" class="form-control rounded-0" placeholder="Fullname">
                </div>

                <div class="form-group">
                    <label for="exampleInputRounded0">User Email</label>
                    <input type="text" class="form-control rounded-0" placeholder="Email">
                </div>

                <div class="form-group">
                    <label for="exampleInputRounded0">User Password</label>
                    <input :type="chechBox === true ? 'text' : 'password'" class="form-control rounded-0" placeholder="Password">
                </div>

                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="showPassword" id="flexCheckDefault" v-model="chechBox">
                    <label class="form-check-label" for="flexCheckDefault">
                        Show password
                    </label>
                </div>

               <div class="form-group">
                    <label>Select user role</label>
                    <select class="form-control" v-model="formData.role">
                        <option disabled value="">selected</option>
                        <option value="person">person</option>
                        <option value="starf">starf</option>
                        <option value="admin">admin</option>
                    </select>
                </div>

            </div>
        </Modal>
    </main>
</template>