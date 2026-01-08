<template>
    <div class="submit-form  d-flex  align-items-center justify-content-between flex-space-right  max-vh-100" style="min-height: 70vh; gap:6rem;"> <!---->

        <div v-if="!submitted" class="camera  d-flex flex-column" style="padding-bottom: 10vh;">
            <div class="background ">
                <div class="face front ">
                    <div class="form-group m-1">
                        <p class="mb-1 text-center">Current Username</p>
                        <p class="mb-1 text-center">{{ username1 }}</p>
                        <!-- set label for form the id correlates to -->
                        <label for="changeUName">Change Username?</label>
                        <input type="text" class="form-control" id="changeUName" required v-model="user.username"
                            name="changeUName" :maxlength="15" :placeholder="userUpdateText" />
                    </div>
                    <button @click="changeUser" class="btn btn-success">Change Username</button>
                </div>
                <div class="face top"></div>
                <div class="face left"></div>
            </div>
        </div>



        <div v-else>
            <h4>Changed username successfully</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>

        <div v-if="!submitted" class="camera cameraRight p-3 d-flex flex-column" >
            <div class="background rotate">
                <div class="face front">
                    <div class="form-group">
                        <!-- set label for form the id correlates to -->
                        <label for="changeUName">Change Password?</label>
                        <input type="text" class="form-control" id="changeUName" required v-model="user.password"
                            name="changeUName" :placeholder="passUpdateText" />
                    </div>
                    <button @click="changePassword" class="btn btn-success" style="margin-bottom: 30vh;">Change Password</button>
                </div>
                <div class="face top"></div>
                <div class="face right"></div>
            </div>
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

const username1 = ref("")
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
            userUpdateText.value = "Changed!"
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
            passUpdateText.value = "Changed!"
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

:root {
    --size: 100px;
    --longWidth: 150px;
}

.camera {
    /* width: var(--size);
  margin: 0 auto;  */
    position: relative;
    perspective: 900px;
    perspective-origin: 50% -200px;
}

.cameraRight{
    perspective: 1250px;
    perspective-origin: 100% -250px;
}

.background {
    width: var(--size);
    aspect-ratio: 1;

    position: relative;
    transform-style: preserve-3d;
    transform-origin: calc(var(--size)/2) bottom calc(calc(var(--size)/2)*-1);
    transform: rotateY(15deg)
}


.rotate{
    transform: rotateY(-15deg)
}

.face {
    position: absolute;
    width: var(--longWidth);
    aspect-ratio: 1;
    transform-style: preserve-3d;
}

.face.front {
    background-color: #F8AD77;
    min-height: 200%;
    max-height: 200%;
}

.face.top {
    bottom: 100%;
    transform-origin: bottom;
    transform: rotateX(90deg);
    background-color: #FFC499;
}

.face.right {
    left: 150%;
    padding-bottom: 200%;
    transform-origin: left;
    transform: rotateY(90deg);
    background-color: #E09966;
}

.face.left {
    right: 100%;
    padding-bottom: 200%;
    transform-origin: right;
    transform: rotateY(-90deg);
    background-color: #E09966;
}

@keyframes rotate {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotateY(360deg);
    }
}
</style>