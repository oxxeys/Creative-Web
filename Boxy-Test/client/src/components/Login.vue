<template>
    <div class="submit-form d-flex justify-content-around align-items-center"
        style="margin: 0px; min-width: 100%;min-height: 100%;">
        <div style="max-width: 50%;"> 
            <h2>Welcome back to Boxy!</h2>
            <p style="color:black;display: inline-flex; margin: 0px;margin-right: 1ch;">Don't already have an account?
            </p>
            <RouterLink  to="/createUser" class="fw-bold text-decoration-underline" style="color:black;">Make One</RouterLink>         
        </div>

        <div class="d-flex flex-column justify-content-center gap-3">
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


    </div>
</template>

<script setup>

import { reactive, ref } from "vue";
import userAuthServices from "../services/userAuthServices.js";
import { loggedInBool } from "../store/loginCheck.js";
// import router so we can push user about
import { useRouter } from "vue-router"

// submitted flag
const submitted = ref(false);

//code to check if the user is from the qr code - using url search paramerters 
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('qr');
let fromQRCode

console.log(myParam)

if (myParam) {
    fromQRCode = true
    console.log(myParam)
}
else {
    console.log("not detected to be from qr code!")
}


// reactive tutorial object
const user = reactive({
    _id: null,
    username: "",
    password: "",
    email: "",
});




// initialise router
const router = useRouter()

// login user
const loginUser = async () => {
    const data = { // data to sennd in 
        username: user.username,
        password: user.password,
    };

    try {
        const response = await userAuthServices.Login(data); // call login, sending in username + password which goes to db

        // set value if username is in db 
        if (response.data.username) {
            loggedInBool.value = true
            submitted.value = true
            if (fromQRCode) {
                router.push("/QRCreatePost")
            }
            else {
                router.push("/")
            }

        }
    } catch (e) {
        console.error(e);
    }
};


</script>

<style>

</style>