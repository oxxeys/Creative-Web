// vue setup 
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';



// bootstrap setup
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap'
//css overide bootstrap
import './assets/main.css'

const app = createApp(App);

// add router
app.use(router);

// mount the app
app.mount('#app'); 