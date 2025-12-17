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
                    name="changeUName" :placeholder="userUpdateText"/>
            </div>
            <button @click="changeUser" class="btn btn-success">Change Username</button>
        </div>

        <div v-else>
            <h4>Changed username successfully</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>

        <div v-if="!submitted">
            <div class="form-group">
                <!-- set label for form the id correlates to -->
                <label for="changeUName">Change Password?</label>
                <input type="text" class="form-control" id="changeUName" required v-model="user.password"
                    name="changeUName" :placeholder="passUpdateText"/>
            </div>
            <button @click="changePassword" class="btn btn-success">Change Password</button>
        </div>

        <div v-else>
            <h4>Changed password successfully!</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import userAuthServices from "../services/userAuthServices.js";

const username1 = ref("Username: ")
const userUpdateText = ref("New Username: ")
const passUpdateText = ref("New Password: ")

onMounted(async () => {
    // get username
    //make a call to the back end
    const res = await userAuthServices.fetchUserInfo()
    // show username 
    console.log(res)
    username1.value = res.data.username
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
    user.username = ""
    user.password = ""

};

// allow user to change thier username or password through a form 
const changeUser = async () => {
    const data = { // data to send in (taken from the form the user fills out)
        username: user.username
    };

    try {
        const response = await userAuthServices.changeUsername(data); // call login, sending in username + password which goes to db
        console.log(response)

        // set value if username is in db 
        if (response.data.username) {
            username1.value = response.data.username // set username label to new value
            user.username = "" // reset field
            userUpdateText.value = "Username Changed!"
            // submitted.value = true
        }
    } catch (e) {
        console.error(e);
    }
};

// allow user to change thier username or password through a form 
const changePassword = async () => {
    const data = { // data to send in (taken from the form the user fills out)
        username: username1.value,
        password: user.password
    };

    try {
        const response = await userAuthServices.changePassword(data); // call login, sending in username + password which goes to db
        console.log(response)

        // set value if username is in db 
        if (response) {
            user.password = "" // reset field
            passUpdateText.value = "Password Changed!"
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