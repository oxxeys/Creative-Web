// vue setup 
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';

// bootstrap setup
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App);

// add router
app.use(router);

// mount the app
app.mount('#app'); 