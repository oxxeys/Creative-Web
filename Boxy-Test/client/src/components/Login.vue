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
import { loggedInBool } from "../store/loginCheck.js";
// import router so we can push user about
import { useRouter } from "vue-router"

//code to check if the user is from the qr code - using url search paramerters 
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('qr');
let fromQRCode
console.log(myParam)
if (myParam){
    fromQRCode = true
    console.log(myParam)
}
else{
    console.log("not detected to be from qr code!")
}


// reactive tutorial object
const user = reactive({
    _id: null,
    username: "",
    password: "",
    email: "",
});

// submitted flag
const submitted = ref(false);


// reset form for new user
const newUser = () => {
    submitted.value = false
    user._id = null
    user.username = ""
    user.password = ""
    user.email = ""
};

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
            if (fromQRCode){
                router.push("/QRCreatePost")
            }
            else{
               router.push("/") 
            }
            
        }
    } catch (e) {
        console.error(e);
    }
};


</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>