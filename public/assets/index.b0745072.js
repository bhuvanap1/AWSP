import{a as c,o as r,c as u,b as o,w as p,v as h,d as w,F as _,r as v,m as k,n as m,e as b,f as C,T as D,t as g,g as x,h as f,i as T,j as M,k as U}from"./vendor.d5191ace.js";const A=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}};A();var y=(s,e)=>{const i=s.__vccOpts||s;for(const[l,t]of e)i[l]=t;return i};const L={name:"todo-list",props:{loggedInUser:{type:String,required:!0},todos:{type:Object,required:!0},createdByMe:{type:Object,required:!0},assignedToMe:{type:Object,required:!0},users:{type:Object,required:!0}},components:{},data(){return{newTodo:"",idForTodo:3,filter:"all",date:new Date,assigness:[],selectedOption:"Assign To",newTask:!1,savedTodo:{},todoValue:"",assignedToValue:"",createddate:"",completedValue:0,duedate:"",completedTodos:[],activeTodos:[],taskIsCompleted:!1,enteredDate:"",enteredMonth:"",enteredYear:""}},computed:{remaining(){return this.activeTodos.length||0},anyRemaining(){return this.remaining!=0},todosFiltered(){return this.filter=="all"?this.todos:this.filter=="active"?this.activeTodos:this.filter=="completed"?this.completedTodos:this.filter=="assignedtome"?this.assignedToMe:this.filter=="createdbyme"?this.createdByMe:this.todos},showClearCompletedButton(){return this.todos.filter(s=>s.completed).length>0},getAllUsers(){for(const s in this.users)if(Object.hasOwnProperty.call(this.users,s)){const e=this.users[s];e.username!==this.loggedInUser?this.assigness.push(e.username):this.msg="No Users"}return this.assigness}},methods:{getCalDate(s){this.duedate=s.target.value},async addTodo(){let s=this.assignedToValue,e=this.todoValue,i=this.loggedInUser,l=new Date().toLocaleDateString().replaceAll("/","-"),t=this.enteredDate+"-"+this.enteredMonth+"-"+this.enteredYear;if(s.trim().length==0||e.trim().length==0||t.trim().length==0||l.trim().length==0)return;let a={url:window.$http+"/",method:"post",headers:{"Content-type":"application/json"},data:JSON.stringify({assignedTo:s,title:e,dueDate:t,createdBy:i,createdDate:l,completed:0})};await c(a).then(n=>{this.newTask=!1,this.savedTodo=n.data,console.log(n.data)}).catch(n=>console.log(n.message)),this.newTodo="",this.idForTodo++},removeTodo(s){const e=this.todos.findIndex(i=>i.id==s);this.todos.splice(e,1)},checkAllTodos(){this.todos.forEach(s=>s.completed=event.target.checked)},async clearCompleted(){const s={url:window.$http+"/",method:"delete",headers:{"Content-type":"application/json"}};try{await c(s).then(e=>{console.log(e.data)}).catch(e=>{this.msg="Error deleting Todos",console.log(e.message)})}catch(e){console.log(e.message)}},finishedEdit(s){const e=this.todos.findIndex(i=>i.id==s.id);this.todos.splice(e,1,s)},async markAsComplete(s){let e={url:window.$http+`/${s}`,method:"put",headers:{"Content-type":"application/json"},data:JSON.stringify({assignedTo:this.todo.assignedTo,title:this.todo.title,dueDate:this.todo.dueDate,createdBy:this.todo.createdBy,createdDate:this.todo.createdDate,completed:1})};await c(e).then(i=>console.log(i)).catch(i=>console.log(i))},async removeTodo(s){let e={url:window.$http+`/${s}`,method:"delete",headers:{"Content-type":"application/json"}};try{await c(e).then(i=>{console.log(i.data)}).catch(i=>{this.msg="Error deleting todo",console.log(i.message)})}catch(i){console.log(i.message)}this.$emit("removedTodo",s)},editTodo(){this.beforeEditCache=this.title,this.editing=!0},async statusChanged(s){let e={url:window.$http+`/${s._id}`,method:"put",headers:{"Content-type":"application/json"},data:JSON.stringify({assignedTo:s.assignedTo,title:s.title,dueDate:s.dueDate,createdBy:s.createdBy,createdDate:s.createdDate,completed:1})};await c(e).then(i=>console.log(i)).catch(i=>console.log(i))},cancelEdit(){this.title=this.beforeEditCache,this.editing=!1}},async mounted(){const s={url:window.$http+"/completed/0",method:"get",headers:{"Content-type":"application/json"}},e={url:window.$http+"/completed/1",method:"get",headers:{"Content-type":"application/json"}};await c(s).then(i=>this.activeTodos=i.data),await c(e).then(i=>this.completedTodos=i.data)}},j={class:"container mt-1",style:{"max-width":"1000px"}},I={class:"p-5 mb-4 bg-light rounded-3"},E={class:"container-fluid py-5"},V={class:"row m-auto"},O=o("h2",{class:"mb-4"},"Add New Tasks",-1),B={class:"col-md-4"},q={class:"mb-3"},N=o("label",{for:"tasktitle",class:"form-label"},"Task Title",-1),S={class:"mb-3"},$=o("label",{for:"assign",class:"form-label"},"Assign To",-1),F=o("option",null,"Select User",-1),P=["selected","value"],R={class:"row mb-5"},Y=o("label",{for:"assign",class:"form-label"},"Due Date",-1),J={class:"col-4"},z={class:"col-4"},G={class:"col-4"},K={class:"col-md-8",style:{"padding-left":"50px"}},H={key:0,class:"mt-5 text-danger text-center"},Q={class:"list-group-item d-flex justify-content-between align-items-start"},W={class:"ms-2 me-auto"},X=["onChange","value","disabled"],Z=o("span",{class:"small",style:{"margin-left":"25px"}},"DUE DATE",-1),ee={class:"px-2 small"},te=["onClick"],se=["disable"];function oe(s,e,i,l,t,a){return r(),u("div",null,[o("div",j,[o("div",I,[o("div",E,[o("div",V,[O,o("div",B,[o("form",null,[o("div",q,[N,p(o("input",{type:"text",class:"form-control",id:"tasktitle",placeholder:"Descriptive Title","onUpdate:modelValue":e[0]||(e[0]=n=>t.todoValue=n)},null,512),[[h,t.todoValue]])]),o("div",S,[$,p(o("select",{id:"assign",class:"form-select","onUpdate:modelValue":e[1]||(e[1]=n=>t.assignedToValue=n)},[F,(r(!0),u(_,null,v(a.getAllUsers,n=>(r(),u("option",{key:n,selected:a.getAllUsers[0],value:n},g(n),9,P))),128))],512),[[w,t.assignedToValue]])]),o("div",R,[Y,o("div",J,[o("input",k({type:"number",class:"form-control",id:"date",placeholder:"dd"},t.enteredDate),null,16)]),o("div",z,[p(o("input",{type:"number",class:"form-control",id:"month",placeholder:"mm","onUpdate:modelValue":e[2]||(e[2]=n=>t.enteredMonth=n)},null,512),[[h,t.enteredMonth]])]),o("div",G,[p(o("input",{type:"number",class:"form-control",id:"year",placeholder:"yyyy","onUpdate:modelValue":e[3]||(e[3]=n=>t.enteredYear=n)},null,512),[[h,t.enteredYear]])])]),o("button",{type:"button",class:"btn btn-primary form-control",onClick:e[4]||(e[4]=(...n)=>a.addTodo&&a.addTodo(...n))}," Submit ")])]),o("div",K,[o("span",{class:m(["badge bg-primary",{active:t.filter=="all"}]),onClick:e[5]||(e[5]=n=>t.filter="all")},"All available Tasks",2),o("span",{class:m(["badge bg-success mx-3",{active:t.filter=="completed"}]),onClick:e[6]||(e[6]=n=>t.filter="createdbyme")},"Tasks that created",2),o("span",{class:m(["badge bg-info mx-3",{active:t.filter=="completed"}]),onClick:e[7]||(e[7]=n=>t.filter="assignedtome")},"Tasks Assigned to Me",2),b(D,{name:"fade","enter-active-class":"animated fadeInUp","leave-active-class":"animated fadeOutDown"},{default:C(()=>[a.todosFiltered.length==0?(r(),u("div",H," No data found matching the specified filters ")):(r(!0),u(_,{key:1},v(a.todosFiltered,n=>(r(),u("ul",{class:"list-group mt-3",key:n._id,onRemovedTodo:e[9]||(e[9]=(...d)=>a.removeTodo&&a.removeTodo(...d)),onFinishedEdit:e[10]||(e[10]=(...d)=>a.finishedEdit&&a.finishedEdit(...d))},[o("li",Q,[o("div",W,[o("div",null,[p(o("input",{class:"form-check-input me-1",type:"checkbox","onUpdate:modelValue":e[8]||(e[8]=d=>s.completed=d),onChange:d=>a.statusChanged(n),value:n.completed==1,disabled:n.completed==1},null,40,X),[[x,s.completed]]),o("span",{class:m({completed:s.completed})},g(n.title),3)]),Z,o("span",ee,g(n.dueDate),1)]),n.completed==0?(r(),u("span",{key:0,class:"badge bg-danger rounded-pill",onClick:d=>a.removeTodo(n._id)},"\xD7",8,te)):f("",!0),n.completed==1||t.taskIsCompleted?(r(),u("span",{key:1,class:"badge bg-success rounded-pill",disable:n.completed==1}," \u221A Completed ",8,se)):f("",!0)])],32))),128))]),_:1})])])])])])])}var ne=y(L,[["render",oe]]);const ie={components:{TodoList:ne},data(){return{msg:"",username:"",password:"",users:[],todos:[],assignedToMe:[],createdByMe:[],loggedInAs:"",userLoggedIn:!1}},async mounted(){let s={url:window.$http+"/users",method:"get",headers:{"Content-type":"application/json"}};await c(s).then(e=>{this.users=e.data}).catch(e=>{this.msg="Error Loading users",console.log(e.message)})},methods:{verifyUser(){for(const s in this.users)if(Object.hasOwnProperty.call(this.users,s)){const e=this.users[s];e.username===this.username&&e.password===this.password?(this.msg="",this.userLoggedIn=!0,this.loggedInAs=e.username,this.getuserData(e.username)):this.msg="Incorrect credentials"}},async getuserData(){let s={url:window.$http+"/users",method:"get",headers:{"Content-type":"application/json"}},e={url:window.$http+"/",method:"get",headers:{"Content-type":"application/json"}},i={url:window.$http+`/mytodos/${this.username}`,method:"get",headers:{"Content-type":"application/json"}},l={url:window.$http+`/created/${this.username}`,method:"get",headers:{"Content-type":"application/json"}};try{await c(s).then(t=>{this.users=t.data}).catch(t=>{this.msg="Error Loading User Data",console.log(t.message)}),await c(e).then(t=>{this.todos=t.data}).catch(t=>{this.msg="Error Loading Todo Data",console.log(t.message)}),await c(i).then(t=>{this.assignedToMe=t.data}).catch(t=>{this.msg="Error Loading Assigned to Data",console.log(t.message)}),await c(l).then(t=>{this.createdByMe=t.data}).catch(t=>{this.msg="Error Loading Created by Data",console.log(t.message)})}catch(t){console.log(t)}}}},ae={class:"card notification hcard"},de={key:0,class:"container mt-5",style:{"max-width":"700px"}},le={class:"p-5 mb-4 bg-light rounded-3"},re={class:"container-fluid py-5"},ce={class:"row m-auto"},ue=o("h2",{class:"mt-3 mb-4"}," Manage your Tasks easily, faster and efficiently ",-1),pe={class:"col-md-6"},he={class:"text-danger"},me={class:"mb-3"},ge=o("label",{for:"username",class:"form-label"},"Username",-1),fe={class:"mb-3"},ye=o("label",{for:"password",class:"form-label"},"Password",-1),_e=o("div",{class:"col-md-6"},[o("img",{src:"https://ww1.prweb.com/prfiles/2011/05/02/8985031/Todo-for-Mac-App-Icon.png",class:"img-fluid",alt:"Task Icons"})],-1);function ve(s,e,i,l,t,a){const n=T("TodoList");return r(),u("div",ae,[t.userLoggedIn?f("",!0):(r(),u("div",de,[o("div",le,[o("div",re,[o("div",ce,[ue,o("div",pe,[o("form",null,[o("p",he,g(t.msg),1),o("div",me,[ge,p(o("input",{type:"text",class:"form-control",id:"username","aria-describedby":"a","onUpdate:modelValue":e[0]||(e[0]=d=>t.username=d)},null,512),[[h,t.username]])]),o("div",fe,[ye,p(o("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":e[1]||(e[1]=d=>t.password=d)},null,512),[[h,t.password]])]),o("button",{type:"button",class:"btn btn-primary float-end",onClick:e[2]||(e[2]=(...d)=>a.verifyUser&&a.verifyUser(...d))}," Submit ")])]),_e])])])])),t.userLoggedIn?(r(),M(n,{key:1,assignedToMe:t.assignedToMe,createdByMe:t.createdByMe,users:t.users,loggedInUser:t.loggedInAs,todos:t.todos},null,8,["assignedToMe","createdByMe","users","loggedInUser","todos"])):f("",!0)])}var be=y(ie,[["render",ve]]);const Te={components:{Login:be},mounted(){let s=document.createElement("script");s.setAttribute("src","https://unpkg.com/bootstrap@5.1.3/dist/js/bootstrap.min.js"),document.head.appendChild(s)}},we={class:"wrapper"};function ke(s,e,i,l,t,a){const n=T("Login");return r(),u("header",null,[o("div",we,[b(n)])])}var Ce=y(Te,[["render",ke]]);window.$http="http://localhost:3000/api/todo";U(Ce).mount("#app");
