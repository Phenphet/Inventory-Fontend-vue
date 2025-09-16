<script setup>
    import { onMounted, reactive, ref } from 'vue'
    import Swal from 'sweetalert2'
    
    import { useStockStore } from '../stores/stock'
    import { useProductStore } from '@/stores/product'
    import { useWarehouseStore } from '@/stores/warehouse'

    import Modal from '../components/Modal.vue' 

    const statusModal = ref('create')
    
    const stockStore = useStockStore()
    const productStore = useProductStore()
    const warehosueStore = useWarehouseStore()

    const formData = reactive({
        movementId: '',
        productID: '',
        quantity: '',
        date: '',
        sli: '',
        remake: '',
        referenceNumber :''
    })

    onMounted(() => {
        stockStore.getOutbound()
        productStore.getAll()
        warehosueStore.getAll()
    })

    const formatDate = (date) => {
        const olyDate = date.split('T')[0]
        return olyDate
    }

    const clearForm = () => {
        formData.movementId = ''
        formData.productID = ''
        formData.quantity = ''
        formData.date = ''
        formData.sli = ''
        formData.remake = ''
        formData.referenceNumber = ''
    }

    const saveData = () => {
        if(stockStore.createOutbound(formData)){
            Swal.fire({
                icon:'success',
                text: 'ทำการเพิ่มข้อมูลเรียบร้อยเเล้ว',
                timer: 2000
            })
            clearForm()
        }else{
             Swal.fire({
                icon: 'error',
                text: 'ไม่สามารถทำการเพิ่มช้อมูลได้',
                timer: 2000
            })
            clearForm()
        
        }
    }
    
    const btnEdit = (movement_id) => {
        statusModal.value = 'update'
        const data = stockStore.stockDataOUT.find(item => item.movement_id === movement_id)
        console.log(data)


        formData.movementId = data.movement_id
        formData.productID = data.product.product_id
        formData.quantity = data.quantity
        formData.date = data.movement_date
        formData.sli = data.warehouseLocation_SLI.location_id
        formData.remake = data.remarks
        formData.referenceNumber = data.reference_number

        console.log(formData)
    }

    const editData = () => {
        Swal.fire({
            icon: 'question',
            text: 'คุณต้องการที่จะแก้ไขข้อมูลหรือไม่', 
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            closeButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                stockStore.updateOutbound(formData)
                Swal.fire({
                    icon: 'success',
                    text: 'ทำการแก้ไขข้อมูลเรียบร้อยเเล้ว',
                    timer: 2000
                })
                clearForm()
            }
        })
    }

    const btnDelete = (movement_id) => {
        Swal.fire({
            icon: 'question',
            text: 'คุณต้องการที่จะลบข้อมูลหรือไม่', 
            showCancelButton: true,
            confirmButtonText: 'ตกลง',
            closeButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                stockStore.deleteOutbound(movement_id)
                Swal.fire({
                    icon: 'success',
                    text: 'ทำการลบข้อมูลเรียบร้อยเเล้ว',
                    timer: 2000
                })
            }
        })
    }

</script>
<template>
    <main>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header row">
                        <h3 class="card-title col-sm-10 pt-2">Table Outbound All </h3>
                        <div class="col-sm-2">
                            <button class="btn btn-success" data-toggle="modal" data-target="#add">Add warehouse</button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="col-sm-12 table-responsive">
                                    <table class="table table-bordered table-hover dataTable dtr-inline " role="grid">
                                        <thead>
                                            <tr role="row">
                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                                    colspan="1" aria-label="Browser: activate to sort column ascending">
                                                    Product Name</th>
                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                                    colspan="1"
                                                    aria-label="Platform(s): activate to sort column ascending">
                                                    Querity</th>
                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                                    colspan="1"
                                                    aria-label="Platform(s): activate to sort column ascending">
                                                    Date</th>

                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                                    colspan="1"
                                                    aria-label="Platform(s): activate to sort column ascending">
                                                    SLI</th>

                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                                    colspan="1"
                                                    aria-label="Platform(s): activate to sort column ascending">
                                                    Remake</th>

                                                <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1"
                                                    colspan="1"
                                                    aria-label="CSS grade: activate to sort column ascending">
                                                    Service</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="" v-for="items in stockStore.stockDataOUT">
                                                <td>{{ items.product.name }}</td>
                                                <td>{{ items.quantity }}</td>
                                                <td>{{ formatDate(items.movement_date) }}</td>
                                                <td>{{ items.warehouseLocation_SLI?.name || '-'}}</td>
                                                <td>{{ items.remarks }}</td>
                                                <td class="">
                                                    <button class="btn btn-info">
                                                        <i class="fa-solid fa-eye"></i>
                                                    </button>
                                                    <button class="btn btn-warning" data-toggle="modal" data-target="#edit" @click="btnEdit(items.movement_id)">
                                                        <i class="fa-solid fa-pen-to-square"></i>
                                                    </button>
                                                    <button class="btn btn-danger" @click="btnDelete(items.movement_id)">
                                                        <i class="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th rowspan="1" colspan="1">Product Name</th>
                                                <th rowspan="1" colspan="1">Querity</th>
                                                <th rowspan="1" colspan="1">Date</th>
                                                <th rowspan="1" colspan="1">DLI</th>
                                                <th rowspan="1" colspan="1">Remake</th>
                                                <th rowspan="1" colspan="1">Service</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12 col-md-5">
                                    <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">
                                        Showing 1 to 10
                                        of 57 entries</div>
                                </div>
                                <div class="col-sm-12 col-md-7">
                                    <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                        <ul class="pagination">
                                            <li class="paginate_button page-item previous disabled"
                                                id="example2_previous"><a href="#" aria-controls="example2"
                                                    data-dt-idx="0" tabindex="0" class="page-link">Previous</a>
                                            </li>
                                            <li class="paginate_button page-item active"><a href="#"
                                                    aria-controls="example2" data-dt-idx="1" tabindex="0"
                                                    class="page-link">1</a></li>

                                            <li class="paginate_button page-item next" id="example2_next"><a href="#"
                                                    aria-controls="example2" data-dt-idx="7" tabindex="0"
                                                    class="page-link">Next</a></li>
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
    </main>

    <Modal :titleModal="statusModal === 'create' ? 'Create Outbound' : 'Update Outbound'"
        :idModal="statusModal === 'create' ? 'add' : 'edit'"
        :btn-name="statusModal === 'create' ? 'Save Data' : 'Edit Data'"
        :functions="statusModal === 'create' ? saveData : editData">
        <div class="form-group">
            <label>Select product</label>
            <select class="form-control" v-model="formData.productID">
                <option disabled value="">selected</option>
                <option v-for="items in productStore.productData" :value="items.product_id">{{ items.name }}
                </option>
            </select>
        </div>

        <div class="form-group">
            <label for="exampleInputRounded0">Quantity</label>
            <input type="text" class="form-control rounded-0" placeholder="Quantity" v-model="formData.quantity">
        </div>

        <div class="form-group">
            <label for="exampleInputRounded0">Date in</label>
            <input type="date" class="form-control rounded-0" placeholder="Date" v-model="formData.date">
        </div>

        <div class="form-group">
            <label>Select location</label>
            <select class="form-control" v-model="formData.sli">
                <option disabled value="">selected</option>
                <option v-for="items in warehosueStore.warehouseData" :value="items.location_id">{{ items.name }} |
                    {{ items.address }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="exampleInputRounded0">Remake</label>
            <input type="text" class="form-control rounded-0" placeholder="Remake" v-model="formData.remake">
        </div>

        <div class="form-group">
            <label for="exampleInputRounded0">Reference</label>
            <input type="text" class="form-control rounded-0" placeholder="Reference Number" v-model="formData.referenceNumber">
        </div>
    </Modal>
</template>