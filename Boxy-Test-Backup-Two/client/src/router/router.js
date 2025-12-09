//import create router and create web history
import { createRouter, createWebHistory } from 'vue-router';

// import the routes we use 
import PostList from '../components/PostList.vue';
import Post from '../components/Post.vue';
import AddPost from '../components/AddPost.vue';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';


import userAuth from "../services/userAuthServices";

const routes = [
  {
    path: '/',
    alias: '/posts',
    name: 'posts',
    component: PostList,
  },
  {
    path: '/post/:id',
    name: 'post-details',
    component: Post,
  },
  {
    path: '/postAdd',
    name: 'add',
    component: AddPost,
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

router.beforeEach(async (to, from, next) => {
  const res = await userAuth.checkSession();

  if (!res.data.username && to.path !== "/Login") {
    next("/Login");
  } else {
    next();
  }
});

export default router;



//chat gpt to turn vue 2 -> vue 3 code - https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/#Vuejs_Front-end