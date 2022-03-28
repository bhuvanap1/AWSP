<template>
  <div class="card notification hcard">
    <div class="container mt-5" style="max-width: 700px" v-if="!userLoggedIn">
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <div class="row m-auto">
            <h2 class="mt-3 mb-4">
              Manage your Tasks easily, faster and efficiently
            </h2>
            <div class="col-md-6">
              <form>
                <p class="text-danger">{{ msg }}</p>
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    aria-describedby="a"
                    v-model="username"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-primary float-end"
                  @click="verifyUser"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="col-md-6">
              <img
                src="https://ww1.prweb.com/prfiles/2011/05/02/8985031/Todo-for-Mac-App-Icon.png"
                class="img-fluid"
                alt="Task Icons"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <TodoList
      v-if="userLoggedIn"
      :assignedToMe="assignedToMe"
      :createdByMe="createdByMe"
      :users="users"
      :loggedInUser="loggedInAs"
      :todos="todos"
    />
  </div>
</template>

<style>
.hfield {
  margin-top: 30px;
}
</style>

<script>
import axios from 'axios';
import TodoList from './TodoList.vue';

export default {
  components: {
    TodoList,
  },

  data() {
    return {
      msg: '',
      username: '',
      password: '',
      users: [],
      todos: [],
      assignedToMe: [],
      createdByMe: [],
      loggedInAs: '',
      userLoggedIn: false,
    };
  },
  async mounted() {
    let request = {
      url: window.$http + '/users',
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      },
    };

    await axios(request)
      .then((res) => {
        this.users = res.data;
      })
      .catch((error) => {
        this.msg = 'Error Loading users';
        console.log(error.message);
      });
  },
  methods: {
    verifyUser() {
      for (const key in this.users) {
        if (Object.hasOwnProperty.call(this.users, key)) {
          const element = this.users[key];
          if (
            element.username === this.username &&
            element.password === this.password
          ) {
            this.msg = '';
            this.userLoggedIn = true;
            this.loggedInAs = element.username;
            this.getuserData(element.username);
          } else {
            this.msg = 'Incorrect credentials';
          }
        }
      }
    },
    async getuserData() {
      let requestUsers = {
        url: window.$http + '/users',
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
      };

      let requestTodos = {
        url: window.$http + '/',
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
      };

      let requestTodosAssignedToMe = {
        url: window.$http + `/mytodos/${this.username}`,
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
      };

      let requestTodosCreatedMe = {
        url: window.$http + `/created/${this.username}`,
        method: 'get',
        headers: {
          'Content-type': 'application/json',
        },
      };

      try {
        await axios(requestUsers)
          .then((res) => {
            this.users = res.data;
          })
          .catch((error) => {
            this.msg = 'Error Loading User Data';
            console.log(error.message);
          });

        await axios(requestTodos)
          .then((res) => {
            this.todos = res.data;
          })
          .catch((error) => {
            this.msg = 'Error Loading Todo Data';
            console.log(error.message);
          });

        await axios(requestTodosAssignedToMe)
          .then((res) => {
            this.assignedToMe = res.data;
          })
          .catch((error) => {
            this.msg = 'Error Loading Assigned to Data';
            console.log(error.message);
          });

        await axios(requestTodosCreatedMe)
          .then((res) => {
            this.createdByMe = res.data;
          })
          .catch((error) => {
            this.msg = 'Error Loading Created by Data';
            console.log(error.message);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
