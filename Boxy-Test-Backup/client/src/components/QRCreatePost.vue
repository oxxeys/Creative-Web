<template>
  <div class="submit-form">
    <div v-if="!submitted">  
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required v-model="tutorial.title" name="title" :maxlength="15" placeholder="Max 15 characters"/>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" required v-model="tutorial.description" name="description" :maxlength="70" placeholder="Max 70 characters" rows="4" style="background-color: #e7c88d9a; resize: none;"/>
      </div>

      <!-- <div class="form-group">
        <label for="addPic">Add a Picture!</label>
        <input class="form-control" id="addPic" type="file" accept="image/*" required v-on:change="tutorial.picture" name="addPic" />
      </div> -->

      <div v-if="geolocationFlag && currentGeolocation">
        <div class="form-group" >
          <label for="description">lat: {{ currentGeolocation.coords.latitude  }}, long: {{ currentGeolocation.coords.longitude  }}</label>
        </div>
      </div>
      <div v-else>
        <label for="description">no geolocation found!</label>
        <input class="form-control" id="description" required v-model="tutorial.location" name="description" />
        <!-- Would like to expand -->
        <!-- if user *can't* use geolocation features then allow them to maually enter the location - but only if they can't! -->
      </div>

      <!-- look into disable button untill geolocationFlag and currentGeolocation are true -->
      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Enter the App</button>
    </div>
  </div>

</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import PostDataServices from "../services/PostDataServices.js";
import userAuthServices from "../services/userAuthServices.js";
import { useRouter } from "vue-router"

const currentUsername = ref(" ")

//router to push user around
const router = useRouter()

// reactive tutorial object
const tutorial = reactive({
  _id: null,
  title: "",
  description: "",
  published: false,
  longitude: "",
  latitude: "",
  picture: null,
  username: "",
});

// submitted flag
const submitted = ref(false);

const geolocationFlag = ref(false);

const currentGeolocation = ref(null)

onMounted(async() => {

    // get username
    const res = await userAuthServices.fetchUserInfo()
    currentUsername.value = res.data.username

  // done using Geolocation API docs from mozilla (refrenced in document) 
  if ("geolocation" in navigator){
    geolocationFlag.value = true // allow geolocation section to be shown 
    //put current position into a var
    navigator.geolocation.getCurrentPosition((position) => { 
      currentGeolocation.value = position // get current position
    }) 
    
  }
})

// save tutorial method
const saveTutorial = async () => {
  let data = {
    title: tutorial.title,
    description: tutorial.description,
    longitude: currentGeolocation.value.coords.longitude,
    latitude: currentGeolocation.value.coords.latitude,
    username: currentUsername.value
    // picture: tutorial.addPic
  };
  try {
    const response = await PostDataServices.create(data);
    tutorial.id = response.data._id;
    console.log(response.data);
    submitted.value = true;
  } catch (e) {
    console.error(e);
  }
};

// reset form for new tutorial
const newTutorial = () => {
  submitted.value = false;
  tutorial._id = null;
  tutorial.title = "";
  tutorial.description = "";
  tutorial.published = false;

  router.push("/") 
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>