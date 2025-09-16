<script setup>
    import { ref, onMounted, reactive } from 'vue'
    import { RouterView } from 'vue-router'
    import Swal from 'sweetalert2'
</script>
<template>

   <main>
    <div class="content-header">
            <div class="container-fluid">
                <h1>Stock Management</h1>
            </div>
        </div>
        <section class="content">
            <div class="container-fluid">
                <RouterView />
            </div>
        </section>
   </main>

</template>