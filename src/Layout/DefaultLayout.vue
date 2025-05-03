<script setup>
    import { RouterLink, RouterView } from 'vue-router'

    import SideBar from '../components/SideBar.vue';
    import NavBar from '../components/NavBar.vue';
    import Footer from '../components/Footer.vue';
</script>

<template>
     <main>
    <NavBar />
    <SideBar />
    <div class="content-wrapper">
      <RouterView />
    </div>
    <aside class="control-sidebar control-sidebar-dark">
       Control sidebar content goes here 
    </aside> 
    <Footer /> 
  </main>
</template>