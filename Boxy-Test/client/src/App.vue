<!-- this is the root folder of the projecrt -->

<template>
  <div id="App">
    <!-- nav bar set here -->
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">bezKoder</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/postAdd" class="nav-link">Add</router-link>
        </li>
        <!-- show when logged out -->
        <li v-if="loggedIn" class="nav-item">
          <router-link to="/createUser" class="nav-link">Register</router-link>
        </li>
        <li v-if="loggedIn" class="nav-item">
          <router-link to="/Login" class="nav-link">Login</router-link>
        </li>
        <!-- show when logged in - this could be a button instead! -->
        <li class="nav-item">
          <router-link to="/LogOut" class="nav-link">Log Out</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: "App",


  computed: {
    loggedIn() {
      return sessionStorage.getItem("user") === null
    }
  }

</script>