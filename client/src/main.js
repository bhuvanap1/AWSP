import { createApp } from 'vue';
import App from './App.vue';


// window.$http = `http://localhost:3000/api/todo`;
window.$http = 'https://krishnatodos.herokuapp.com/api/todo';
//Production

createApp(App).mount('#app');
