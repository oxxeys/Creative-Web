<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Username</label>
                <input type="text" class="form-control" id="username" required v-model="user.username"
                    name="username" :maxlength="15" placeholder="Max 15 characters"/>
            </div>

            <!-- 
      <input
          type="text"
          class="form-control" - set the class
          id="username" - gives element a id 
          required - makes it a required element
          v-model="user.username" - listens and changes data in form upon user changing it 
          name="username"
        />
      -->

            <div class="form-group">
                <!-- set label for form the id correlates to -->
                <label for="password">Password</label>
                <input type="text" class="form-control" id="password" required v-model="user.password"
                    name="password" />
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" required v-model="user.email" name="email" />
            </div>


            <button @click="saveUser" class="btn btn-success ">Submit</button>
        </div>

        <div v-else class="text-center">
            <h2>Registered!</h2>
            <p >Please now log in to confirm your a real human and not a box!</p>
            <button class="btn btn-success" @click="newUser">Login</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import userAuthServices from "../services/userAuthServices.js";
import { useRouter } from "vue-router"

// reactive user object
const user = reactive({
    _id: null,
    username: "",
    password: "",
    email: "",
});

// submitted flag
const submitted = ref(false);

//initialise router
const router = useRouter()

// save user method
const saveUser = async () => {
    const data = {
        username: user.username,
        password: user.password,
        email: user.email,
    };

    try {
        const response = await userAuthServices.create(data);
        user.id = response.data._id;
        console.log(response.data);
        submitted.value = true;
        
    } catch (e) {
        console.error(e);
    }
};

// reset form for new user
const newUser = () => {
    submitted.value = false;
    user._id= null;
    user.username= "";
    user.password= "";
    user.email= "";
    router.push("/")
};
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>