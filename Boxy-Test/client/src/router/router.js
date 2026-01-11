// Front end routes are written here

//import create router and create web history
import { createRouter, createWebHistory } from 'vue-router';

// import the routes we use 
import QRCreatePost from '../components/QRCreatePost.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import home from "../components/home.vue";
import profile from "../components/profile.vue";

import userAuth from "../services/userAuthServices";

const routes = [
  {
    path: '/',
    alias: '/home',
    name: 'home',
    component: home,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/QRCreatePost',
    name: 'QRCreatePost',
    component: QRCreatePost,
    meta: { requiresAuth: true }
  },
  {
    path: '/createUser',
    name: 'createUser',
    component: Register,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router guard to check if user is logged in before accessing certain routes
// this was done with the help of chat gpt - i had read through the docs but was confused about how 
router.beforeEach(async (to, from, next) => {
  const res = await userAuth.checkSession();
  if (to.meta.requiresAuth && !res.data.username) {
    next("/Login");
  } else {
    next();
  }
});

export default router;



//chat gpt to turn help vue 2 -> vue 3 code - https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/#Vuejs_Front-end