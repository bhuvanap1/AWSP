<script setup lang="ts">
import session from "../models/session";
import { ref, reactive, onMounted } from 'vue';
import * as users from "../models/user"
let currentTab= ref('All');
let newTaskName = ref('');
let dueDate = ref('');
let assignedTo = ref('');
let userTaskArray = session.user?.userTasks; 
let allTasks = reactive(session.user != null?session.user.userTasks:null);
let tasks= reactive(session.user != null?session.user.userTasks:null);
let assignedUser: any;
let allUserTasks = users.list
function addTask(this: any){
        const user = users.list.find(u => u.id+"" == assignedTo.value);
        assignedUser = session.user?.handle
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
            this.tasks = user?.userTasks;
        }
        
      //   allTasks.unshift({
      //     task: newTaskName.value,
      //     dueDate: dueDate.value,
      //     isCompleted: false
      // });
      //this.tasks = this.allTasks;
}
function taskHandler(this: any, currentTab : any){
  if (this.currentTab.includes('Current')) {
            this.tasks = this.allTasks.filter((task: any) => !task.isCompleted);
          }
          else if (this.currentTab.includes('Completed')) {
            this.tasks = this.allTasks.filter((task: any) => task.isCompleted);
          }
          else {
            this.tasks = this.allTasks;
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
                <li :class='{ "is-active": currentTab == "Current" }' @click="currentTab = 'Current',taskHandler('Current')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-clipboard-list" aria-hidden="true"></i>
                    </span>
                    <span>Current</span>
                  </a>
                </li>
                <li :class='{ "is-active": currentTab == "Completed" }' @click="currentTab = 'Completed',taskHandler('Completed')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-calendar-times" aria-hidden="true"></i>
                    </span>
                    <span>Completed</span>
                  </a>
                </li>
                <li :class='{ "is-active": currentTab == "All" }' @click="currentTab = 'All',taskHandler('All')">
                  <a>
                    <span class="icon ">
                      <i class="fas fa-calendar" aria-hidden="true"></i>
                    </span>
                    <span>All</span>
                  </a>
                </li>
              </ul>
            </div>
            
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
                    </tr>
                </thead>
                   <tbody  v-for="(task,i) in allUserTasks" :key="task.userTasks[i]">
                  <tr v-for="(tasklist,j) in allUserTasks[i].userTasks" :key="tasklist[j]">
                        <td>{{ task.userTasks[j].task }}</td>
                        <td>{{ task.userTasks[j].dueDate }}</td>
                        <td>{{ allUserTasks[i].handle }}</td>
                        <td>{{ task.userTasks[j].assignedBy }}</td>
                    </tr>
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