<script setup lang="ts">
import session from "../models/session";
import { ref, reactive, onMounted } from 'vue';
import * as users from "../models/user"
import { User } from "../models/user";
const currentTab= ref('All');
const newTaskName = ref('');
const dueDate = ref('');
const assignedTo = ref('');
const userTaskArray = session.user?.userTasks; 
const allTasks = reactive(session.user != null?session.user.userTasks:null);
const tasks = ref(session.user != null?session.user.userTasks:null);
const assignedUser = ref(null as string | null | undefined);
//let tasks: Array<string>;
console.log(users.list);
function addTask(){
        const user = users.list.find(u => u.id+"" == assignedTo.value);
        assignedUser.value = session.user?.handle
        console.log(assignedUser);
        console.log(user)
        user?.userTasks.unshift({ 
          task: newTaskName.value,
          dueDate: dueDate.value,
          isCompleted: false,
          assignedBy: assignedUser
        })
        console.log(user)
        if(session.user?.id+"" == assignedTo.value ){
            tasks.value = user?.userTasks;
        }        
}
function taskHandler( tab : string){
  currentTab.value = tab
  if (currentTab.value.includes('Current')) {
            tasks.value = allTasks.filter((task: any) => !task.isCompleted);
          }
          else if (currentTab.value.includes('Completed')) {
            tasks.value = allTasks.filter((task: any) => task.isCompleted);
          }
          else {
            tasks.value = allTasks;
          }
}
</script>

<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="panel">
            <div class="tabs is-boxed">
              <ul>
                <li :class='{ "is-active": currentTab == "Current" }' @click="taskHandler('Current')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-clipboard-list" aria-hidden="true"></i>
                    </span>
                    <span>Current</span>
                  </a>
                </li>
                <li :class='{ "is-active": currentTab == "Completed" }' @click="taskHandler('Completed')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-calendar-times" aria-hidden="true"></i>
                    </span>
                    <span>Completed</span>
                  </a>
                </li>
                <li :class='{ "is-active": currentTab == "All" }' @click="taskHandler('All')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-calendar" aria-hidden="true"></i>
                    </span>
                    <span>All</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="panel-block">
              <form style="width: 100%;" @submit.prevent="addTask">
                <div class="field has-addons">
                  <div class="control has-icons-left is-expanded">
                    <input class="input is-primary" type="text" placeholder="New Task" v-model="newTaskName" />
                    <span class="icon is-left">
                      <i class="fas fa-calendar-plus" aria-hidden="true"></i>
                    </span>
                  </div><br>
                  <div class="control has-icons-left is-expanded">
                    <input class="input is-primary" type="date" placeholder="Date" v-model="dueDate" />
                    <span class="icon is-left">
                      <i class="fa fa-dharmachakra" aria-hidden="true"></i>
                    </span>
                  </div><br>
                  <div class="control has-icons-left is-expanded">
                    <select class="input is-primary" type="text" placeholder="Select User" v-model="assignedTo">
                      <option v-for="userlst in users.list" :key="userlst.firstName" v-bind:value="userlst.id">{{userlst.firstName}}</option>
                    </select>
                    <span class="icon is-left">
                      <i class="fas fa-book-reader" aria-hidden="true"></i>
                    </span>
                  </div><br>
                  <div class="control">
                    <button class="button is-primary">Add</button>
                  </div>
                </div>
              </form>
            </div>
            <!-- <a class="panel-block" >
              <input type="checkbox"/>
              <span></span>
            </a> -->
            <table class="table" style="width: 100%;">
             <thead>
                    <tr>
                        <th>
                            <abbr title="title">Title</abbr>
                        </th>
                        <th>
                            <abbr title="dueDate">Due Date(yyyy/mm/dd)</abbr>
                        </th>
                        <th>
                            <abbr title="assignedTo">Assigned To</abbr>
                        </th>
                        <th>
                            <abbr title="assignedBy">Assigned by</abbr>
                        </th>
                        <th>
                            <abbr title="completed">Completed</abbr>
                        </th>
                    </tr>
                </thead>
                   <tbody  v-for="task in tasks" :key="task.title">
             <!-- <a class="panel-block" :class="{ 'is-completed': currentTab != 'Completed' && task.isCompleted }">
                  <input type="checkbox" v-model="task.isCompleted" /> -->
                  <tr>
               
                        <td>{{ task.task }}</td>
                        <td>{{ task.dueDate }}</td>
                        <td>{{session.user?.handle}}</td>
                        <td>{{task.assignedBy}}</td>
                        <td><a class="panel-block" :class="{ 'is-completed': currentTab != 'Completed' && task.isCompleted }"><input type="checkbox" v-model="task.isCompleted" /></a></td>
                  </tr>
                <!-- </a> -->
              </tbody>
                 </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>