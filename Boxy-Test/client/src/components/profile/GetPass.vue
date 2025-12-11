<template>
        <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Username</label>
                <input type="text" class="form-control" id="username" required v-model="user.username"
                    name="username" />
            </div>

            <div class="form-group">
                <!-- set label for form the id correlates to -->
                <label for="password">Password</label>
                <input type="text" class="form-control" id="password" required v-model="user.password"
                    name="password" />
            </div>

            <button @click="getPass" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You logged in successfully!</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>
    </div>
</template>

<script setup>
import userAuthServices from "../services/userAuthServices.js";
import { loggedInBool } from "./store/loginCheck.js";

console.log(loggedInBool.value)


</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>