<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <p for="title">Username : </p>
                <p class="">{{ username1 }}</p>
            </div>

            <div class="form-group">
                <!-- set label for form the id correlates to -->
                <label for="changeUName">Change Username?</label>
                <input type="text" class="form-control" id="changeUName" required v-model="user.username"
                    name="changeUName" />
            </div>
            <button @click="changeUser" class="btn btn-success">Change Username</button>
        </div>

        <div v-else>
            <h4>You logged in successfully!</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import userAuthServices from "../services/userAuthServices.js";
import { loggedInBool } from "../store/loginCheck.js";

const username1 = ref("Username: ")

onMounted(async () => {
// get username
    //make a call to the back end
    const res = await userAuthServices.fetchUserInfo()
// show username 
console.log(res)
username1.value = res.data.username

// allow user to change thier username or password through a form 
})


// reactive tutorial object
const user = reactive({
    username: "",
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

// login code

// import router so we can push user about
import { useRouter } from "vue-router"
const router = useRouter()

// Change User
const changeUser = async () => {
    const data = { // data to send in (taken from the form the user fills out)
        username: user.username
    };

    try {
        const response = await userAuthServices.changeUsername(data); // call login, sending in username + password which goes to db

        // set value if username is in db 
        if (response.data.username) {
            loggedInBool.value = true
            submitted.value = true
            router.push("/")
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