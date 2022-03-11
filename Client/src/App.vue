<script setup lang="ts">
import Nav from './components/nav.vue';
</script>

<template>
  <div>
    <Nav />
    <div class="container">
        <router-view></router-view>
    </div>
  </div>
</template>

<style>
</style>