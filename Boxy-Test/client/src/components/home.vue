<template>
  <div class="list row">

    <!-- col - column -->
    <!-- md - medium size screen styling -->
    <!-- 6 - 50% width due to 6/12 -->
    <div class="col-md-12 min-vh-100 p-3">
      <h1>Boxy</h1>
      <h4>Boxy</h4>
    </div>

    <div class="col-md-12 min-vh-100 p-3 d-flex flex-column">
      <h4>Boxys Last Seen Location!</h4>
      <div id="sidebar">
        Longitude: {{ location.center.lng.toFixed(4) }} | 
        Latitude:{{ location.center.lat.toFixed(4) }} | 
        Zoom:{{ location.zoom.toFixed(2) }} |
      </div>
      <Map v-model="location" class="flex-grow-1" />
    </div>


    <div class="col-md-12 min-vh-100">
      <div class="col-md-6 p-3">
        <h4>Boxy</h4>

        <ul class="list-group">
          <li class="list-group-item" :class="{ active: index === currentIndex }" v-for="(tutorial, index) in tutorials"
            :key="tutorial._id" @click="setActiveTutorial(tutorial, index)">
            {{ tutorial.title }}
          </li>
        </ul>

        <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button> -->
      </div>

      <div class="col-md-6 p-3">
        <div v-if="currentTutorial">
          <h4>Tutorial</h4>
          <div>
            <label><strong>Title:</strong></label> {{ currentTutorial.title }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ currentTutorial.description }}
          </div>
          <div>
            <label><strong>Latitude:</strong></label>
            {{ currentTutorial.latitude}}
          </div>
          <div>
            <label><strong>Longitude:</strong></label>
            {{ currentTutorial.longitude}}
          </div>

          <router-link class="badge badge-warning" :to="'/post/' + currentTutorial._id">
            Edit
          </router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PostDataServices from "../services/PostDataServices.js";
import Map from "./Map.vue";

// state variables
const tutorials = ref([]);
const currentTutorial = ref(null);
const currentIndex = ref(-1);
const title = ref("");
const singlePostLocation = []


// fetch all tutorials
const retrieveTutorials = async () => {
  try {
    const response = await PostDataServices.getAll();
    tutorials.value = response.data;
    // console.log(response.data);
  } catch (e) {
    console.error(e);
  }
};

// refresh list
const refreshList = () => {
  retrieveTutorials();
  currentTutorial.value = null;
  currentIndex.value = -1;
};

// set active tutorial
const setActiveTutorial = (tutorial, index) => {
  currentTutorial.value = tutorial;
  currentIndex.value = index;
};

// delete all tutorials
const removeAllTutorials = async () => {
  try {
    const response = await PostDataServices.deleteAll();
    // console.log(response.data);
    refreshList();
  } catch (e) {
    console.error(e);
  }
};

// search tutorials by title
const searchTitle = async () => {
  try {
    const response = await PostDataServices.findByTitle(title.value);
    tutorials.value = response.data;
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
};

// fetch tutorials when component mounts
onMounted(retrieveTutorials);

onMounted(async() => {
  // fetch most recent posts
    try {
        const res = await PostDataServices.mostRecentPost()
        
        let long = res.data.longitude[0]
        let lat = res.data.latitude[0]
        location.value.center = {lng: long, lat: lat}

    } catch (e) {
        console.error(e)
    }

})
  
const location = ref({
  center: { lng: -5.3877, lat: 51.3794 },
  zoom: 12,
})


</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>