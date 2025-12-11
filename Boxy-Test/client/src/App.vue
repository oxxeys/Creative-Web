<!-- this is the root folder of the projecrt -->

<template>
  <div id="App">
    <!-- nav bar set here -->
    <nav class="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-center">
      <router-link to="/" class="navbar-brand">Boxy!</router-link>
      <div class="navbar-nav mr-auto">
        <!-- <li v-if="loggedIn" class="nav-item">
          <router-link to="/profile" class="nav-link">profile</router-link>
        </li> -->

        <!-- ADD ONLY ROUTED TO IF ON MOBILE && IF CAME FROM QR CODE -->
        <!-- <li v-if="loggedIn" class="nav-item">
          <router-link to="/postAdd" class="nav-link">Add</router-link>
        </li> -->
        <li v-if="loggedIn" class="nav-item">
          <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
        <li v-if="loggedIn" class="ms-auto nav-item">
          <!-- <router-link to="/LogOut" class="nav-link">Log Out</router-link> -->
          <button class="btn btn-link nav-link" @click="logOut()">Log Out</button>
        </li>
        <!-- show when logged out -->
        <li v-if="!loggedIn" class="nav-item">
          <router-link to="/createUser" class="nav-link">Register</router-link>
        </li>
        <li v-if="!loggedIn" class="nav-item">
          <router-link to="/Login" class="nav-link">Login</router-link>
        </li>
        <!-- show when logged in - this could be a button instead! -->

      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>

import boxyUserAuthService from "./services/userAuthServices";
import { loggedInBool } from "./store/loginCheck.js";

export default {
  name: "App",

  computed: {
    loggedIn() {
      return loggedInBool.value
    }
  },

  async created() {
    const res = await boxyUserAuthService.checkSession();
    loggedInBool.value = !!res.data.username;
  },

  methods: {
    async logOut() { // async as it calls to the server to check if user is logged in 
      await boxyUserAuthService.logout();
      loggedInBool.value = false;
      //send user to login page if logged out
      this.$router.push('/login')
    }
  }
}
</script>