import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

const app = createApp(App);

// add router
app.use(router); 

// mount the app
app.mount('#app'); 