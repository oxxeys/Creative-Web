<template>
  <div class="submit-form d-flex justify-content-around align-items-center"
        style="margin: 0px; min-width: 100%;min-height: 100%;" >
        <div v-if="!submitted" style="max-width: 50%;text-align: center;"> 
            <h2>Make a post!</h2>
            <p>You found boxy in the wild!</p>
            <p>Make a post to let others know what your doing with them!</p>
            <p>Dont feel like making a post?</p>
            <RouterLink  to="/" class="fw-bold text-decoration-underline" style="color:black;">Continue on to the home page!</RouterLink>    
      </div>
    <div v-if="!submitted" class="d-flex flex-column justify-content-center gap-3">  
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required v-model="post.title" name="title" :maxlength="15" placeholder="Max 15 characters"/>
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" required v-model="post.description" name="description" :maxlength="70" placeholder="Max 70 characters" rows="4" style="background-color: #e7c88d9a; resize: none;"/>
      </div>
      <div  style="text-align: center;">
      <div v-if="geolocationFlag && currentGeolocation">
        <div class="form-group" >
          <p for="description">We have your location!</p>
          <!-- <label for="description">lat: {{ currentGeolocation.coords.latitude  }}, long: {{ currentGeolocation.coords.longitude  }}</label> -->
        </div>
      </div>
      <div v-else >
        <label for="longitude" >no geolocation found!</label>
        <input class="form-control" id="longitude" required v-model="post.longitude" name="longitude" />
        <input class="form-control" id="latitude" required v-model="post.latitude" name="latitude" />
      </div>

      <!-- look into disable button untill geolocationFlag and currentGeolocation are true -->
      <button @click="savePost" class="btn btn-success">Submit</button>
    </div>
  </div>

    <div v-else class="d-flex flex-column">
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success " @click="newPost">Enter the App!</button>
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

// reactive post object
const post = reactive({
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

let latToUse
let longToUse

// save post method
const savePost = async () => {

  // if user has allowed geolocation we use that data, otherwise we use the data they enter
  if (geolocationFlag && currentGeolocation.value){
    latToUse = currentGeolocation.value.coords.latitude
    longToUse = currentGeolocation.value.coords.longitude
  }
  else{
    latToUse = post.latitude 
    longToUse = post.longitude 
  }
  
  let data = {
    title: post.title,
    description: post.description,
    longitude: longToUse,
    latitude: latToUse,
    username: currentUsername.value
    // picture: post.addPic
  };
  try {
    const response = await PostDataServices.create(data);
    post.id = response.data._id;
    console.log(response.data);
    submitted.value = true;
  } catch (e) {
    console.error(e);
  }
};

// reset form for new post
const newPost = () => {
  submitted.value = false;
  post._id = null;
  post.title = "";
  post.description = "";
  post.published = false;

  router.push("/") 
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>