<script setup>
import { ref, reactive, onMounted } from 'vue'

import { useDasbordStore } from '@/stores/dasbord'
import { useProductStore } from '@/stores/product'
import { useCategoryStore } from '@/stores/category'
import { useStockStore } from '@/stores/stock'
import { useWarehouseStore } from '@/stores/warehouse'

import moment from 'moment'

const productStore = useProductStore()
const categoryStore = useCategoryStore()
const stockStore = useStockStore()
const warehouseStore = useWarehouseStore()
const dasbordStore = useDasbordStore()

const chartData = ref(null)
const day = ref([])

const allDayforMonth = () => {
  let startOfMonth = moment().startOf('month')
  const endOfMonth = moment().endOf('month')
  while (startOfMonth.isSameOrBefore(endOfMonth)) {
    day.value.push(startOfMonth.format('YYYY-MM-DD'))
    startOfMonth = startOfMonth.add(1, 'day')
  }
}

onMounted(async () => {
  allDayforMonth()
  await dasbordStore.getChartData()
  await productStore.getSummary()
  await dasbordStore.getChartData()
  await dasbordStore.getRecentStock()
  await dasbordStore.getCurentstock()

  const ctx = chartData.value.getContext('2d')

  const stockInQuantities = await day.value.map(labelDate => {
    const found = dasbordStore.stockInData.find(item => {
      return new Date(item.movement_date).toISOString().slice(0, 10) === labelDate;
    });

    return found ? found.quantity : 0;
  });

  const stockOutQuantities = await day.value.map(labelDate => {
    const found = dasbordStore.stockOutData.find(item => {
      return new Date(item.movement_date).toISOString().slice(0, 10) === labelDate;
    });

    return found ? found.quantity : 0;
  });

  new window.Chart(ctx, {
    type: 'bar',
    data: {
      labels: day.value.map(item => item),
      datasets: [
        {
          label: 'stock in',
          backgroundColor: '#28a745',
          borderColor: '#28a745',
          data: stockInQuantities
        },
        {
          label: 'stock out',
          backgroundColor: '#dc3545',
          borderColor: '#dc3545',
          data: stockOutQuantities
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  })
})

const formatDate = (date) => {
  const format = date.split('T')[0] 
  return format
} 
</script>

<template>
  <main>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12">
            <h1 class="m-0">Dashboard</h1>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{ productStore.productSummary.countProduct }}</h3>

                <p>สินค้าทั้งหมด</p>
              </div>
              <div class="icon">
                <i class="ion ion-android-archive"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{ productStore.productSummary.sumProduct }}</h3>
                <p>ยอดสินค้าคงเหลือรวม</p>
              </div>
              <div class="icon">
                <i class="ion ion-android-home"></i>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{ productStore.productSummary.sotckMove }}</h3>

                <p>รายการเคลื่อนไหววันนี้</p>
              </div>
              <div class="icon">
                <i class="ion ion-clipboard"></i>
              </div>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-3 col-6">
            <!-- small box -->
            <div class="small-box bg-info">
              <div class="inner">
                <h3>{{ productStore.productSummary.lowQuantity }}</h3>

                <p>สินค้าใกล้หมด</p>
              </div>
              <div class="icon">
                <i class="ion ion-alert-circled"></i>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->
        <div class="row">
          <div class="col-sm-12">
            <div class="card" >
              <div class="card-header">
                <h3 class="card-title">Stock in and out</h3>
              </div>
              <div class="card-body">
                <div class="chart" >
                  <div class="chartjs-size-monitor">
                    <div class="chartjs-size-monitor-expand">
                      <div class=""></div>
                    </div>
                    <div class="chartjs-size-monitor-shrink">
                      <div class=""></div>
                    </div>
                  </div>
                  <canvas ref="chartData"
                    style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%; display: block; width: 405px;"
                    width="506" height="312" class="chartjs-render-monitor"></canvas>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
          </div>
          
        </div>

        <div class="row">
          <div class="col-sm-6">
            <div class="card card-success">
              <div class="card-header">
                <h3 class="card-title">Curent Stock Levels</h3>
              </div>
              <div class="card-body">
                <div class="col-sm-12 table-responsive">
                  <table class="table table-bordered table-hover dataTable dtr-inline " role="grid">
                    <thead>
                      <tr role="row">
                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Product
                        </th>

                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Warehouse
                        </th>
                        
                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="" v-for="items in dasbordStore.curentStock">
                        <td>{{ items.name }}</td>
                        <td>{{ items.latestStockMovement }}</td> 
                        <td>{{ items.quantity }}</td>
                       </tr> 
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card card-success">
              <div class="card-header">
                <h3 class="card-title">Recent Stock Movement</h3>
              </div>
              <div class="card-body">
                <div class="col-sm-12 table-responsive">
                  <table class="table table-bordered table-hover dataTable dtr-inline " role="grid">
                    <thead>
                      <tr role="row">
                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Date
                        </th>

                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Type
                        </th>
                        
                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Product
                        </th>

                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Quantity
                        </th>

                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Source Location
                        </th>

                        <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Destination Location
                        </th>

                         <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
                          aria-label="Browser: activate to sort column ascending">
                          Remarks
                        </th>

                      </tr>
                    </thead>
                    <tbody>
                      <tr class="" v-for="items in dasbordStore.recentStock">
                        <td>{{ formatDate(items.movement_date) }}</td>
                        <td>{{ items.movement_type }}</td>
                        <td>{{ items.product.name }}</td>
                        <td>{{ items.quantity }}</td>
                        <td>{{ items.warehouseLocation_SLI?.name || '-' }}</td>
                        <td>{{ items.warehouseLocation_DLI?.name || '-' }}</td>
                        <td>{{ items.remarks }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
