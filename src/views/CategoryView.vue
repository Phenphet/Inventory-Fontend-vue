<script setup>
  import { onMounted, ref, reactive } from 'vue'
  import Swal from 'sweetalert2'
  
  import { useCategoryStore } from '../stores/category'

  import Modal from '../components/Modal.vue'

  const statusModal = ref('create')
  const formData = reactive({
    category_id: '',
    name: '',
    description: ''
  })

  const categoryStore = useCategoryStore()

  onMounted(() => {
    categoryStore.getAll()
  })

  const clearFormData = () => {
    formData.id = ''
    formData.name = ''
    formData.description = ''
  }

  const saveData = () => {
    console.log(formData.name)
    console.log(formData.description)
    categoryStore.createData(formData)
    clearFormData()
  }

  const btnCreate = () => {
    statusModal.value = 'create'
    clearFormData()
  }

  const btnUpdate = (categoryId) => {
    statusModal.value = 'update'
    const data = categoryStore.categoryData.find(item => item.category_id === categoryId)
    console.log(data)
    formData.category_id = data.category_id
    formData.name = data.name
    formData.description = data.description
  }

  const editData = () => {
    Swal.fire({
      icon: 'question',
      text: 'คุณต้องการแก้ไขข้อมูลสินค้าหรือไม่?',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      closeButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        categoryStore.updateDate(formData)
        Swal.fire({
          icon: 'success',
          text: 'ทำการแก้ไขข้อมูลเรียบร้อยเเล้ว',
          timer: 2000
        })
        clearFormData()
      }
    })
  }

  const btnDelete = (category_id) => {
     Swal.fire({
            icon: 'question',
            text: 'คุณต้องการลบหมวดหมู่นี้หรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            closeButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(category_id)
                categoryStore.deleteData(category_id)
            }
        })
  } 
</script>

<template>
  <main>
    <div class="content-header">
      <div class="container-fluid">
        <h1>Category</h1>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header row">
                <h3 class="card-title col-sm-10 pt-2">Table category All </h3>
                <div class="col-sm-2">
                  <button class="btn btn-success" data-toggle="modal" data-target="#add" @click="btnCreate()">Add
                    category</button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                  <div class="row">
                    <div class="col-sm-12">
                      <table class="table table-bordered table-hover dataTable dtr-inline " role="grid">
                        <thead>
                          <tr role="row">
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                              aria-label="Browser: activate to sort column ascending">
                              Category Name</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                              aria-label="Platform(s): activate to sort column ascending">
                              Description</th>
                            <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                              aria-label="CSS grade: activate to sort column ascending">
                              Service</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="" v-for="items in categoryStore.categoryData">
                            <td>{{ items.name }}</td>
                            <td>{{ items.description }}</td>
                            <td class="">
                              <button class="btn btn-info">
                                <i class="fa-solid fa-eye"></i>
                              </button>
                              <button class="btn btn-warning" data-toggle="modal" data-target="#edit"
                                @click="btnUpdate(items.category_id)">
                                <i class="fa-solid fa-pen-to-square"></i>
                              </button>
                              <button class="btn btn-danger" @click="btnDelete(items.category_id)">
                                <i class="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th rowspan="1" colspan="1">Category Name</th>
                            <th rowspan="1" colspan="1">Description</th>
                            <th rowspan="1" colspan="1">Service</th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-5">
                      <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10
                        of 57 entries</div>
                    </div>
                    <div class="col-sm-12 col-md-7">
                      <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                        <ul class="pagination">
                          <li class="paginate_button page-item previous disabled" id="example2_previous"><a href="#"
                              aria-controls="example2" data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                          </li>
                          <li class="paginate_button page-item active"><a href="#" aria-controls="example2"
                              data-dt-idx="1" tabindex="0" class="page-link">1</a></li>

                          <li class="paginate_button page-item next" id="example2_next"><a href="#"
                              aria-controls="example2" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li>
                        </ul>
                      </div>
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

    <Modal :titleModal="statusModal === 'create' ? 'Create Category' : 'Update Category'"
      :idModal="statusModal === 'create' ? 'add' : 'edit'"
      :btn-name="statusModal === 'create' ? 'Save Data' : 'Edit Data'"
      :functions="statusModal === 'create' ? saveData : editData">
      <div class="form-group">
        <div class="form-group">
          <label for="exampleInputRounded0">Category Name</label>
          <input type="text" class="form-control rounded-0" v-model="formData.name" placeholder="Name">
        </div>

        <div class="form-group">
          <label for="exampleInputRounded0">Category Description</label>
          <input type="text" class="form-control rounded-0" v-model="formData.description" placeholder="Description">
        </div>
      </div>
    </Modal>
  </main>
</template>