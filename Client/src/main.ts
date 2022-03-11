import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bulma'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles/main.scss';

createApp(App).use(router).mount('#app')