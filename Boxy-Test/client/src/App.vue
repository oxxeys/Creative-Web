<!-- this is the root folder of the projecrt -->

<template>
  <div id="App" data-bs-theme="mainTheme">
    <!-- nav bar set here -->
    <nav class="navbar navbar-expand navbar-dark bg-dark d-flex justify-content-between">
      <!-- <router-link to="/" class="navbar-brand">Boxy?</router-link> -->
      <button v-if="loggedIn" type="button" class="btn" style="color: white;" data-bs-toggle="modal"
        data-bs-target="#whatsBoxy">
        Boxy?
      </button>
      <!-- diffrent font size for this if user is not yet logged in to draw attention to the modal -->
      <button v-if="!loggedIn" type="button" class="btn fs-3 text-decoration-underline" style="color: white; " data-bs-toggle="modal"
        data-bs-target="#whatsBoxy" >
        Whats Boxy?
      </button>
      <div class="navbar-nav" style="padding-right: 30px;">
        <li v-if="loggedIn" class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
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
        
        <li class="align-self">

        </li>

      </div>
    </nav>
    <div class="container mt-3" style="height: 75vh;">
      <router-view />
    </div>
  </div>

  <!-- Modal - https://getbootstrap.com/docs/5.3/components/modal/#how-it-works -->
  <div class="modal fade" id="whatsBoxy" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <!-- designate children content as a modal + center the modal -->
    <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">What's Boxy?</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p style="margin: 2px;">Boxy is a box that was set out into the world! You can track where they've been spotted in the wild on our home page!</p>
          <p style="margin: 2px;">If you've found boxy, scan the QR code on them and you'll be able to make a post!</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" style="background-color: #E8985F; border: 1px solid black"
            data-bs-dismiss="modal">Close</button>
        </div>
      </div>
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