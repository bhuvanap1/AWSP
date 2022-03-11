<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from "vue-router";
import LoginBadge from './LoginBadge.vue';
const isOpen = ref(false);
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="container">
    
      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Tasks</a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/assignedtasks">Tasks Assigned</router-link>
              <router-link class="navbar-item" to="/viewAllTasks">All Tasks</router-link>
            </div>
          </div>
        
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <login-badge />
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<style>
</style>