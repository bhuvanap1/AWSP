<template>
  <div>
    <div>
      <button
        type="submit"
        class="btn btn-primary form-control btn-sidenav"
        @click="Logout"
      >
        Logout
      </button>
    </div>
    <div style="text-align: center">
      <img alt="Vue logo" src="./assets/list.png" height="70" />
      <HelloWorld msg="Welcome" />
    </div>

    <TaskItems />
    
  </div>

</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import TaskItems from "./components/TaskItems.vue";


export default {
  name: "App",
  components: {
    HelloWorld,
    TaskItems,
  },
  methods: {
  async Logout() {
  window.location.href = "http://localhost:8080";
  }
}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}
.btn-sidenav {
  width: 10%;
  margin-left: 90%;
  margin-bottom: 4px;
  display: none;
}
</style>
