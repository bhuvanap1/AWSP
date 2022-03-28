import{a as c,o as r,c as u,b as s,w as h,v as p,d as b,F as _,r as v,n as m,e as T,f as k,T as C,t as g,g as D,h as f,i as w,j as x,k as M}from"./vendor.9f84bfb1.js";const U=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}};U();var y=(o,e)=>{const i=o.__vccOpts||o;for(const[l,t]of e)i[l]=t;return i};const L={name:"todo-list",props:{loggedInUser:{type:String,required:!0},todos:{type:Object,required:!0},createdByMe:{type:Object,required:!0},assignedToMe:{type:Object,required:!0},users:{type:Object,required:!0}},components:{},data(){return{newTodo:"",idForTodo:3,filter:"all",date:new Date,assigness:[],selectedOption:"Assign To",newTask:!1,savedTodo:{},todoValue:"",assignedToValue:"",createddate:"",completedValue:0,duedate:"",completedTodos:[],activeTodos:[],taskIsCompleted:!1,enteredDate:"",enteredMonth:"",enteredYear:""}},computed:{remaining(){return this.activeTodos.length||0},anyRemaining(){return this.remaining!=0},todosFiltered(){return this.filter=="all"?this.todos:this.filter=="active"?this.activeTodos:this.filter=="completed"?this.completedTodos:this.filter=="assignedtome"?this.assignedToMe:this.filter=="createdbyme"?this.createdByMe:this.todos},showClearCompletedButton(){return this.todos.filter(o=>o.completed).length>0},getAllUsers(){for(const o in this.users)if(Object.hasOwnProperty.call(this.users,o)){const e=this.users[o];e.username!==this.loggedInUser?this.assigness.push(e.username):this.msg="No Users"}return this.assigness}},methods:{getCalDate(o){this.duedate=o.target.value},async addTodo(){let o=this.assignedToValue,e=this.todoValue,i=this.loggedInUser,l=new Date().toLocaleDateString().replaceAll("/","-"),t=this.enteredDate+"-"+this.enteredMonth+"-"+this.enteredYear;if(o.trim().length==0||e.trim().length==0||t.trim().length==0||l.trim().length==0)return;let a={url:window.$http+"/",method:"post",headers:{"Content-type":"application/json"},data:JSON.stringify({assignedTo:o,title:e,dueDate:t,createdBy:i,createdDate:l,completed:0})};await c(a).then(n=>{this.newTask=!1,this.savedTodo=n.data,console.log(n.data)}).catch(n=>console.log(n.message)),this.newTodo="",this.idForTodo++},removeTodo(o){const e=this.todos.findIndex(i=>i.id==o);this.todos.splice(e,1)},checkAllTodos(){this.todos.forEach(o=>o.completed=event.target.checked)},async clearCompleted(){const o={url:window.$http+"/",method:"delete",headers:{"Content-type":"application/json"}};try{await c(o).then(e=>{console.log(e.data)}).catch(e=>{this.msg="Error deleting Todos",console.log(e.message)})}catch(e){console.log(e.message)}},finishedEdit(o){const e=this.todos.findIndex(i=>i.id==o.id);this.todos.splice(e,1,o)},async markAsComplete(o){let e={url:window.$http+`/${o}`,method:"put",headers:{"Content-type":"application/json"},data:JSON.stringify({assignedTo:this.todo.assignedTo,title:this.todo.title,dueDate:this.todo.dueDate,createdBy:this.todo.createdBy,createdDate:this.todo.createdDate,completed:1})};await c(e).then(i=>console.log(i)).catch(i=>console.log(i))},async removeTodo(o){let e={url:window.$http+`/${o}`,method:"delete",headers:{"Content-type":"application/json"}};try{await c(e).then(i=>{console.log(i.data)}).catch(i=>{this.msg="Error deleting todo",console.log(i.message)})}catch(i){console.log(i.message)}this.$emit("removedTodo",o)},editTodo(){this.beforeEditCache=this.title,this.editing=!0},async statusChanged(o){let e={url:window.$http+`/${o._id}`,method:"put",headers:{"Content-type":"application/json"},data:JSON.stringify({assignedTo:o.assignedTo,title:o.title,dueDate:o.dueDate,createdBy:o.createdBy,createdDate:o.createdDate,completed:1})};await c(e).then(i=>console.log(i)).catch(i=>console.log(i))},cancelEdit(){this.title=this.beforeEditCache,this.editing=!1}},async mounted(){const o={url:window.$http+"/completed/0",method:"get",headers:{"Content-type":"application/json"}},e={url:window.$http+"/completed/1",method:"get",headers:{"Content-type":"application/json"}};await c(o).then(i=>this.activeTodos=i.data),await c(e).then(i=>this.completedTodos=i.data)}},A={class:"container mt-1",style:{"max-width":"1000px"}},I={class:"p-5 mb-4 bg-light rounded-3"},j={class:"container-fluid py-5"},V={class:"row m-auto"},E=s("h2",{class:"mb-4"},"Add New Tasks",-1),O={class:"col-md-4"},B={class:"mb-3"},q=s("label",{for:"tasktitle",class:"form-label"},"Task Title",-1),N={class:"mb-3"},S=s("label",{for:"assign",class:"form-label"},"Assign To",-1),$=s("option",null,"Select User",-1),F=["selected","value"],P={class:"row mb-5"},R=s("label",{for:"assign",class:"form-label"},"Due Date",-1),Y={class:"col-4"},J={class:"col-4"},z={class:"col-4"},G={class:"col-md-8",style:{"padding-left":"50px"}},K={key:0,class:"mt-5 text-danger text-center"},H={class:"list-group-item d-flex justify-content-between align-items-start"},Q={class:"ms-2 me-auto"},W=["onChange","value","disabled"],X=s("span",{class:"small",style:{"margin-left":"25px"}},"DUE DATE",-1),Z={class:"px-2 small"},ee=["onClick"],te=["disable"];function se(o,e,i,l,t,a){return r(),u("div",null,[s("div",A,[s("div",I,[s("div",j,[s("div",V,[E,s("div",O,[s("form",null,[s("div",B,[q,h(s("input",{type:"text",class:"form-control",id:"tasktitle",placeholder:"Descriptive Title","onUpdate:modelValue":e[0]||(e[0]=n=>t.todoValue=n)},null,512),[[p,t.todoValue]])]),s("div",N,[S,h(s("select",{id:"assign",class:"form-select","onUpdate:modelValue":e[1]||(e[1]=n=>t.assignedToValue=n)},[$,(r(!0),u(_,null,v(a.getAllUsers,n=>(r(),u("option",{key:n,selected:a.getAllUsers[0],value:n},g(n),9,F))),128))],512),[[b,t.assignedToValue]])]),s("div",P,[R,s("div",Y,[h(s("input",{type:"number",class:"form-control",id:"date",placeholder:"dd","onUpdate:modelValue":e[2]||(e[2]=n=>t.enteredDate=n)},null,512),[[p,t.enteredDate]])]),s("div",J,[h(s("input",{type:"number",class:"form-control",id:"month",placeholder:"mm","onUpdate:modelValue":e[3]||(e[3]=n=>t.enteredMonth=n)},null,512),[[p,t.enteredMonth]])]),s("div",z,[h(s("input",{type:"number",class:"form-control",id:"year",placeholder:"yyyy","onUpdate:modelValue":e[4]||(e[4]=n=>t.enteredYear=n)},null,512),[[p,t.enteredYear]])])]),s("button",{type:"button",class:"btn btn-primary form-control",onClick:e[5]||(e[5]=(...n)=>a.addTodo&&a.addTodo(...n))}," Submit ")])]),s("div",G,[s("span",{class:m(["badge bg-primary",{active:t.filter=="all"}]),onClick:e[6]||(e[6]=n=>t.filter="all")},"All available Tasks",2),s("span",{class:m(["badge bg-success mx-3",{active:t.filter=="completed"}]),onClick:e[7]||(e[7]=n=>t.filter="createdbyme")},"Tasks that created",2),s("span",{class:m(["badge bg-info mx-3",{active:t.filter=="completed"}]),onClick:e[8]||(e[8]=n=>t.filter="assignedtome")},"Tasks Assigned to Me",2),T(C,{name:"fade","enter-active-class":"animated fadeInUp","leave-active-class":"animated fadeOutDown"},{default:k(()=>[a.todosFiltered.length==0?(r(),u("div",K," No data found matching the specified filters ")):(r(!0),u(_,{key:1},v(a.todosFiltered,n=>(r(),u("ul",{class:"list-group mt-3",key:n._id,onRemovedTodo:e[10]||(e[10]=(...d)=>a.removeTodo&&a.removeTodo(...d)),onFinishedEdit:e[11]||(e[11]=(...d)=>a.finishedEdit&&a.finishedEdit(...d))},[s("li",H,[s("div",Q,[s("div",null,[h(s("input",{class:"form-check-input me-1",type:"checkbox","onUpdate:modelValue":e[9]||(e[9]=d=>o.completed=d),onChange:d=>a.statusChanged(n),value:n.completed==1,disabled:n.completed==1},null,40,W),[[D,o.completed]]),s("span",{class:m({completed:o.completed})},g(n.title),3)]),X,s("span",Z,g(n.dueDate),1)]),n.completed==0?(r(),u("span",{key:0,class:"badge bg-danger rounded-pill",onClick:d=>a.removeTodo(n._id)},"\xD7",8,ee)):f("",!0),n.completed==1||t.taskIsCompleted?(r(),u("span",{key:1,class:"badge bg-success rounded-pill",disable:n.completed==1}," \u221A Completed ",8,te)):f("",!0)])],32))),128))]),_:1})])])])])])])}var oe=y(L,[["render",se]]);const ne={components:{TodoList:oe},data(){return{msg:"",username:"",password:"",users:[],todos:[],assignedToMe:[],createdByMe:[],loggedInAs:"",userLoggedIn:!1}},async mounted(){let o={url:window.$http+"/users",method:"get",headers:{"Content-type":"application/json"}};await c(o).then(e=>{this.users=e.data}).catch(e=>{this.msg="Error Loading users",console.log(e.message)})},methods:{verifyUser(){for(const o in this.users)if(Object.hasOwnProperty.call(this.users,o)){const e=this.users[o];e.username===this.username&&e.password===this.password?(this.msg="",this.userLoggedIn=!0,this.loggedInAs=e.username,this.getuserData(e.username)):this.msg="Incorrect credentials"}},async getuserData(){let o={url:window.$http+"/users",method:"get",headers:{"Content-type":"application/json"}},e={url:window.$http+"/",method:"get",headers:{"Content-type":"application/json"}},i={url:window.$http+`/mytodos/${this.username}`,method:"get",headers:{"Content-type":"application/json"}},l={url:window.$http+`/created/${this.username}`,method:"get",headers:{"Content-type":"application/json"}};try{await c(o).then(t=>{this.users=t.data}).catch(t=>{this.msg="Error Loading User Data",console.log(t.message)}),await c(e).then(t=>{this.todos=t.data}).catch(t=>{this.msg="Error Loading Todo Data",console.log(t.message)}),await c(i).then(t=>{this.assignedToMe=t.data}).catch(t=>{this.msg="Error Loading Assigned to Data",console.log(t.message)}),await c(l).then(t=>{this.createdByMe=t.data}).catch(t=>{this.msg="Error Loading Created by Data",console.log(t.message)})}catch(t){console.log(t)}}}},ie={class:"card notification hcard"},ae={key:0,class:"container mt-5",style:{"max-width":"700px"}},de={class:"p-5 mb-4 bg-light rounded-3"},le={class:"container-fluid py-5"},re={class:"row m-auto"},ce=s("h2",{class:"mt-3 mb-4"}," Manage your Tasks easily, faster and efficiently ",-1),ue={class:"col-md-6"},he={class:"text-danger"},pe={class:"mb-3"},me=s("label",{for:"username",class:"form-label"},"Username",-1),ge={class:"mb-3"},fe=s("label",{for:"password",class:"form-label"},"Password",-1),ye=s("div",{class:"col-md-6"},[s("img",{src:"https://ww1.prweb.com/prfiles/2011/05/02/8985031/Todo-for-Mac-App-Icon.png",class:"img-fluid",alt:"Task Icons"})],-1);function _e(o,e,i,l,t,a){const n=w("TodoList");return r(),u("div",ie,[t.userLoggedIn?f("",!0):(r(),u("div",ae,[s("div",de,[s("div",le,[s("div",re,[ce,s("div",ue,[s("form",null,[s("p",he,g(t.msg),1),s("div",pe,[me,h(s("input",{type:"text",class:"form-control",id:"username","aria-describedby":"a","onUpdate:modelValue":e[0]||(e[0]=d=>t.username=d)},null,512),[[p,t.username]])]),s("div",ge,[fe,h(s("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":e[1]||(e[1]=d=>t.password=d)},null,512),[[p,t.password]])]),s("button",{type:"button",class:"btn btn-primary float-end",onClick:e[2]||(e[2]=(...d)=>a.verifyUser&&a.verifyUser(...d))}," Submit ")])]),ye])])])])),t.userLoggedIn?(r(),x(n,{key:1,assignedToMe:t.assignedToMe,createdByMe:t.createdByMe,users:t.users,loggedInUser:t.loggedInAs,todos:t.todos},null,8,["assignedToMe","createdByMe","users","loggedInUser","todos"])):f("",!0)])}var ve=y(ne,[["render",_e]]);const Te={components:{Login:ve}},we={class:"wrapper"};function be(o,e,i,l,t,a){const n=w("Login");return r(),u("header",null,[s("div",we,[T(n)])])}var ke=y(Te,[["render",be]]);window.$http="https://krishnatodos.herokuapp.com/api/todo";M(ke).mount("#app");
