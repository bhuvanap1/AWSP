<template>
  <div>
    <div class="container mt-1" style="max-width: 1000px">
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <div class="row m-auto">
            <h2 class="mb-4">Add New Tasks</h2>
            <div class="col-md-4">
              <form>
                <div class="mb-3">
                  <label for="tasktitle" class="form-label">Task Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="tasktitle"
                    placeholder="Descriptive Title"
                    v-model="todoValue"
                  />
                </div>
                <div class="mb-3">
                  <label for="assign" class="form-label">Assign To</label>
                  <select
                    id="assign"
                    class="form-select"
                    v-model="assignedToValue"
                  >
                    <option>Select User</option>
                    <option
                      v-for="item in getAllUsers"
                      :key="item"
                      :selected="getAllUsers[0]"
                      :value="item"
                    >
                      {{ item }}
                    </option>
                  </select>
                </div>

                <div class="row mb-5">
                  <label for="assign" class="form-label">Due Date</label>
                  <div class="col-4">
                    <input
                      type="number"
                      class="form-control"
                      id="date"
                      placeholder="dd"
                      v-model="enteredDate"
                    />
                  </div>
                  <div class="col-4">
                    <input
                      type="number"
                      class="form-control"
                      id="month"
                      placeholder="mm"
                      v-model="enteredMonth"
                    />
                  </div>
                  <div class="col-4">
                    <input
                      type="number"
                      class="form-control"
                      id="year"
                      placeholder="yyyy"
                      v-model="enteredYear"
                    />
                  </div>
                  <!-- </div> -->
                </div>
                <button
                  type="button"
                  class="btn btn-primary form-control"
                  @click="addTodo"
                >
                  Submit
                </button>
              </form>
            </div>
            <div class="col-md-8" style="padding-left: 50px">
              <span
                class="badge bg-primary"
                :class="{ active: filter == 'all' }"
                @click="filter = 'all'"
                >All available Tasks</span
              >
              <span
                class="badge bg-success mx-3"
                :class="{ active: filter == 'completed' }"
                @click="filter = 'createdbyme'"
                >Tasks that created</span
              >
              <span
                class="badge bg-info mx-3"
                :class="{ active: filter == 'completed' }"
                @click="filter = 'assignedtome'"
                >Tasks Assigned to Me</span
              >

              <transition-group
                name="fade"
                enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutDown"
              >
                <div
                  v-if="todosFiltered.length == 0"
                  class="mt-5 text-danger text-center"
                >
                  No data found matching the specified filters
                </div>
                <ul
                  class="list-group mt-3"
                  v-for="todo in todosFiltered"
                  :key="todo._id"
                  @removedTodo="removeTodo"
                  @finishedEdit="finishedEdit"
                  v-else
                >
                  <li
                    class="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div class="ms-2 me-auto">
                      <div>
                        <input
                          class="form-check-input me-1"
                          type="checkbox"
                          v-model="completed"
                          @change="statusChanged(todo)"
                          :value="todo.completed == 1 ? true : false"
                          :disabled="todo.completed == 1"
                        />
                        <span :class="{ completed: completed }">
                          {{ todo.title }}
                        </span>
                      </div>
                      <span class="small" style="margin-left: 25px"
                        >DUE DATE</span
                      >
                      <span class="px-2 small">{{ todo.dueDate }}</span>
                    </div>
                    <span
                      class="badge bg-danger rounded-pill"
                      @click="removeTodo(todo._id)"
                      v-if="todo.completed == 0"
                      >&times;</span
                    >
                    <span
                      class="badge bg-success rounded-pill"
                      v-if="todo.completed == 1 || taskIsCompleted"
                      :disable="todo.completed == 1"
                    >
                      &radic; Completed
                    </span>
                  </li>
                </ul>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'todo-list',
  props: {
    loggedInUser: {
      type: String,
      required: true,
    },
    todos: {
      type: Object,
      required: true,
    },
    createdByMe: {
      type: Object,
      required: true,
    },
    assignedToMe: {
      type: Object,
      required: true,
    },
    users: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      newTodo: '',
      idForTodo: 3,
      filter: 'all',
      date: new Date(),
      assigness: [],
      selectedOption: 'Assign To',
      newTask: false,
      savedTodo: {},
      todoValue: '',
      assignedToValue: '',
      createddate: '',
      completedValue: 0,
      duedate: '',
      completedTodos: [],
      activeTodos: [],
      taskIsCompleted: false,
      enteredDate: '',
      enteredMonth: '',
      enteredYear: '',
    };
  },
  computed: {
    remaining() {
      return this.activeTodos.length || 0;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == 'all') {
        return this.todos;
      } else if (this.filter == 'active') {
        return this.activeTodos;
      } else if (this.filter == 'completed') {
        return this.completedTodos;
      } else if (this.filter == 'assignedtome') {
        return this.assignedToMe;
      } else if (this.filter == 'createdbyme') {
        return this.createdByMe;
      }
      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
    getAllUsers() {
      for (const key in this.users) {
        if (Object.hasOwnProperty.call(this.users, key)) {
          const element = this.users[key];
          if (element.username !== this.loggedInUser) {
            this.assigness.push(element.username);
          } else {
            this.msg = 'No Users';
          }
        }
      }
      return this.assigness;
    },
  },
  methods: {
    getCalDate(e) {
      this.duedate = e.target.value;
    },
    async addTodo() {
      let assignto = this.assignedToValue;
      let task = this.todoValue;
      let by = this.loggedInUser;
      let created = new Date().toLocaleDateString().replaceAll('/', '-');
      let due =
        this.enteredDate + '-' + this.enteredMonth + '-' + this.enteredYear;

      if (
        assignto.trim().length == 0 ||
        task.trim().length == 0 ||
        due.trim().length == 0 ||
        created.trim().length == 0
      ) {
        return;
      }

      let request = {
        url: window.$http + '/',
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        data: JSON.stringify({
          assignedTo: assignto,
          title: task,
          dueDate: due,
          createdBy: by,
          createdDate: created,
          completed: 0,
        }),
      };

      await axios(request)
        .then((res) => {
          this.newTask = false;
          this.savedTodo = res.data;
          console.log(res.data);
        })
        .catch((err) => console.log(err.message));

      this.newTodo = '';
      this.idForTodo++;
    },
    removeTodo(id) {
      const index = this.todos.findIndex((item) => item.id == id);
      this.todos.splice(index, 1);
    },
    checkAllTodos() {
      this.todos.forEach((todo) => (todo.completed = event.target.checked));
    },
    async clearCompleted() {
      const deleteCompleted = {
        url: window.$http + `/`,
        method: 'delete',
        headers: {
          'Content-type': 'application/json',
        },
      };
      // this.todos = this.todos.filter((todo) => !todo.completed);
      try {
        await axios(deleteCompleted)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            this.msg = 'Error deleting Todos';
            console.log(error.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    },
    finishedEdit(data) {
      const index = this.todos.findIndex((item) => item.id == data.id);
      this.todos.splice(index, 1, data);
    },
    async markAsComplete(id) {
      let completedTodoRequest = {
        url: window.$http + `/${id}`,
        method: 'put',
        headers: {
          'Content-type': 'application/json',
        },
        data: JSON.stringify({
          assignedTo: this.todo.assignedTo,
          title: this.todo.title,
          dueDate: this.todo.dueDate,
          createdBy: this.todo.createdBy,
          createdDate: this.todo.createdDate,
          completed: 1,
        }),
      };

      await axios(completedTodoRequest)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));

      // this.completed = this.markAsComplete ? true : this.todo.completed;
    },
    async removeTodo(id) {
      let deletedThisTodod = {
        url: window.$http + `/${id}`,
        method: 'delete',
        headers: {
          'Content-type': 'application/json',
        },
      };

      try {
        await axios(deletedThisTodod)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            this.msg = 'Error deleting todo';
            console.log(error.message);
          });
      } catch (error) {
        console.log(error.message);
      }
      this.$emit('removedTodo', id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    async statusChanged(todo) {
      // this.taskIsCompleted = true;

      let completedTodoRequest = {
        url: window.$http + `/${todo._id}`,
        method: 'put',
        headers: {
          'Content-type': 'application/json',
        },
        data: JSON.stringify({
          assignedTo: todo.assignedTo,
          title: todo.title,
          dueDate: todo.dueDate,
          createdBy: todo.createdBy,
          createdDate: todo.createdDate,
          completed: 1,
        }),
      };

      await axios(completedTodoRequest)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
  },
  async mounted() {
    const todosrequestActive = {
      url: window.$http + `/completed/0`,
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      },
    };

    const todosrequestCompleted = {
      url: window.$http + `/completed/1`,
      method: 'get',
      headers: {
        'Content-type': 'application/json',
      },
    };

    await axios(todosrequestActive).then(
      (res) => (this.activeTodos = res.data)
    );
    await axios(todosrequestCompleted).then(
      (res) => (this.completedTodos = res.data)
    );
  },
};
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
.select:not(.is-multiple):not(.is-loading)::after {
  border-color: #fff !important;
  right: 1.125em;
  z-index: 4;
}
span {
  cursor: pointer;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
