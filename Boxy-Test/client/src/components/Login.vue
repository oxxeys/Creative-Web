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

            <button @click="loginUser" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You logged in successfully!</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import userAuthServices from "../services/userAuthServices.js";

// reactive tutorial object
const user = reactive({
    _id: null,
    username: "",
    password: "",
});

// submitted flag
const submitted = ref(false);

// save user method
const loginUser = async () => {
    const data = { // data to sennd in 
        username: user.username,
        password: user.password,
    };

    try {
        const response = await userAuthServices.Login(data); // send data in then wait
        // user.id = response.data._id;
        // console.log(response.data);
        submitted.value = true;
    } catch (e) {
        console.error(e);
    }
};

// reset form
const newUser = () => {
    submitted.value = false;
    user._id= null;
    user.username= "";
    user.password= "";
};
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>