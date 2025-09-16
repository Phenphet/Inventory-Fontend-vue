<script setup>
    import { onMounted, watch, ref, reactive } from 'vue'
    import Swal from 'sweetalert2'

    import { useProductStore } from '../stores/product.js'
    import { useCategoryStore } from '../stores/category.js'
    import { useWarehouseStore } from '../stores/warehouse.js'

    import Modal from '../components/Modal.vue'

    const productStore = useProductStore()
    const categoryStore = useCategoryStore()
    const locationStore = useWarehouseStore()

    const statusModel = ref('create')

    const statusModalCreate = () => {
        statusModel.value = 'create'
        clearFromData()
    }

    const fromData = reactive({
        product_id: '',
        product_name: '',
        product_description: '',
        category: '',
        quantity: '',
        unit: '',
        level: '',
        location: ''
    })

    const formError = reactive({
        product_name: false,
        product_description: false,
        category: false,
        quantity: false,
        unit: false,
        level: false,
        location: false
    })

    onMounted(async () => {
        await productStore.getAll()
        await categoryStore.getAll()
        await locationStore.getAll()
    })

    const clearFromData = () => {
        fromData.product_name = ''
        fromData.product_description = ''
        fromData.category = ''
        fromData.quantity = ''
        fromData.unit = ''
        fromData.level = ''
        fromData.location = ''

        formError.product_name = false,
        formError.product_description = false,
        formError.category = false,
        formError.quantity = false,
        formError.unit = false,
        formError.level = false,
        formError.location = false
    }

    const validateForm = () => {
        formError.product_name = false,
        formError.product_description = false,
        formError.category = false,
        formError.quantity = false,
        formError.unit = false,
        formError.level = false,
        formError.location = false

        if (fromData.product_name === '') {
            formError.product_name = true
        }
        if (fromData.product_description === '') {
            formError.product_description = true
        }
        if (fromData.category === '') {
            formError.category = true
        }
        if (fromData.quantity === '') {
            formError.quantity = true
        }
        if (fromData.unit === '') {
            formError.unit = true
        }
        if (fromData.level === '') {
            formError.level = true
        }
        if (fromData.location === '') {
            formError.location = true
        }
    }

    const saveData = () => {
        validateForm()
        if (
            fromData.product_name &&
            fromData.product_description &&
            fromData.category &&
            fromData.quantity &&
            fromData.unit &&
            fromData.level &&
            fromData.location
        ) {
            productStore.createData(fromData)
            clearFromData()
        }

    }

    const btnDeleteData = (product_id) => {
        Swal.fire({
            icon: 'question',
            text: 'คุณต้องการลบสินค้าชิ้นนี้หรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            closeButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(product_id)
                productStore.deleteData(product_id)
            }
        })
    }

    const btnEditeData = (product_id) => {
        statusModel.value = 'update'

        const data = productStore.productData.find(items => items.product_id = product_id)
        console.log(data)

        fromData.product_id = data.product_id
        fromData.product_name = data.name
        fromData.product_description = data.description
        fromData.category = data.category_id
        fromData.quantity = data.quantity
        fromData.unit = data.unit
        fromData.level = data.reoder_level
        fromData.location = data.location_id
    }

    const updateData = () => {
        Swal.fire({
            icon: 'question',
            text: 'คุณต้องการแก้ไขข้อมูลสินค้าหรือไม่?',
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            closeButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                productStore.updateDate(fromData)
                Swal.fire({
                    icon: 'success',
                    text: 'ทำการแก้ไขข้อมูลเรียบร้อยเเล้ว',
                    timer: 2000
                })
                clearFromData()
            }
        })
    }
</script>

<template>
    <main>
        <div class="content-header">
            <div class="container-fluid">
                <h1>Product</h1>
            </div>
        </div>
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header row">
                                <h3 class="card-title col-sm-10 pt-2">Table Product All </h3>
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#add"
                                        @click="statusModalCreate()">Add Product</button>
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
                                                            Product Name</th>
                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Platform(s): activate to sort column ascending">
                                                            Description</th>
                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Platform(s): activate to sort column ascending">
                                                            Categoty</th>

                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Platform(s): activate to sort column ascending">
                                                            Quantity</th>

                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Platform(s): activate to sort column ascending">
                                                            Unit</th>

                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Platform(s): activate to sort column ascending">
                                                            Level</th>

                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Platform(s): activate to sort column ascending">
                                                            Location</th>

                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="Platform(s): activate to sort column ascending">
                                                            Address</th>

                                                        <th class="sorting" tabindex="0" aria-controls="example2"
                                                            rowspan="1" colspan="1"
                                                            aria-label="CSS grade: activate to sort column ascending">
                                                            Service</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="" v-for="items in productStore.productData">
                                                        <td>{{ items.name }}</td>
                                                        <td>{{ items.description }}</td>
                                                        <td>{{ items.category.name }}</td>
                                                        <td>{{ items.quantity }}</td>
                                                        <td>{{ items.unit }}</td>
                                                        <td>{{ items.reoder_level }}</td>
                                                        <td>{{ items.warehouselocation.name }}</td>
                                                        <td>{{ items.warehouselocation.address }}</td>
                                                        <td class="">
                                                            <button class="btn btn-info">
                                                                <i class="fa-solid fa-eye"></i>
                                                            </button>
                                                            <button type="button" class="btn btn-warning"
                                                                data-toggle="modal" data-target="#edit"
                                                                @click="btnEditeData(items.product_id)">
                                                                <i class="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                            <button class="btn btn-danger"
                                                                @click="btnDeleteData(items.product_id)">
                                                                <i class="fa-solid fa-trash"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th rowspan="1" colspan="1">Product Name</th>
                                                        <th rowspan="1" colspan="1">Description</th>
                                                        <th rowspan="1" colspan="1">Categoty</th>
                                                        <th rowspan="1" colspan="1">Quantity</th>
                                                        <th rowspan="1" colspan="1">Unit</th>
                                                        <th rowspan="1" colspan="1">Level</th>
                                                        <th rowspan="1" colspan="1">Location</th>
                                                        <th rowspan="1" colspan="1">Address</th>
                                                        <th rowspan="1" colspan="1">Service</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-5">
                                            <div class="dataTables_info" id="example2_info" role="status"
                                                aria-live="polite">Showing 1 to 10 of 57 entries</div>
                                        </div>
                                        <div class="col-sm-12 col-md-7">
                                            <div class="dataTables_paginate paging_simple_numbers"
                                                id="example2_paginate">
                                                <ul class="pagination">
                                                    <li class="paginate_button page-item previous disabled"
                                                        id="example2_previous"><a href="#" aria-controls="example2"
                                                            data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                                                    </li>
                                                    <li class="paginate_button page-item active"><a href="#"
                                                            aria-controls="example2" data-dt-idx="1" tabindex="0"
                                                            class="page-link">1</a></li>

                                                    <li class="paginate_button page-item next" id="example2_next"><a
                                                            href="#" aria-controls="example2" data-dt-idx="7"
                                                            tabindex="0" class="page-link">Next</a></li>
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

        <Modal :titleModal="statusModel === 'create' ? 'Add product' : 'Update product'" :idModal="statusModel === 'create' ? 'add' : 'edit' " :btn-name="statusModel === 'create' ? 'Save Data': 'Edit Data'" :functions="statusModel === 'create' ? saveData : updateData">
            <div class="form-group">
                <div class="form-group">
                    <label for="exampleInputRounded0">Product name</label>
                    <input type="text" class="form-control rounded-0"
                        :class="formError.product_name ? 'is-invalid' : ''" placeholder="Product name"
                        v-model="fromData.product_name">
                </div>

                <div class="form-group">
                    <label for="exampleInputRounded0">Description</label>
                    <input type="text" class="form-control rounded-0" placeholder="Description"
                        :class="formError.product_description ? 'is-invalid' : ''"
                        v-model="fromData.product_description">
                </div>

                <div class="form-group">
                    <label for="exampleInputRounded0">Quantity</label>
                    <input type="text" class="form-control rounded-0" placeholder="Quantity"
                        :class="formError.quantity ? 'is-invalid' : ''" v-model="fromData.quantity">
                </div>

                <div class="form-group">
                    <label>Select category</label>
                    <select class="form-control" :class="formError.category ? 'is-invalid' : ''"
                        v-model="fromData.category">
                        <option disabled value="">selected</option>
                        <option v-for="items in categoryStore.categoryData" :value="items.category_id">{{ items.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Select location</label>
                    <select class="form-control" :class="formError.location ? 'is-invalid' : ''"
                        v-model="fromData.location">
                        <option disabled value="">selected</option>
                        <option v-for="items in locationStore.warehouseData" :value="items.location_id">{{ items.name }}
                        </option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="exampleInputRounded0">Unit</label>
                    <input type="text" class="form-control rounded-0" placeholder="Unit"
                        :class="formError.unit ? 'is-invalid' : ''" v-model="fromData.unit">
                </div>

                <div class="form-group">
                    <label for="exampleInputRounded0">Reorder Level</label>
                    <input type="text" class="form-control rounded-0" placeholder="Reorder Level"
                        :class="formError.level ? 'is-invalid' : ''" v-model="fromData.level">
                </div>
            </div>
        </Modal>
    </main>
</template>