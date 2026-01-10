<template>
  <div class="list row">
    <div class="col-md-8">
      <!-- <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
            Search
          </button>
        </div>
      </div> -->
    </div>

    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="tutorial._id"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button> -->
    </div>

    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <router-link
          class="badge badge-warning"
          :to="'/post/' + currentTutorial._id"
        >
          Edit
        </router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PostDataServices from "../Boxy-Test/client/src/services/PostDataServices.js";

// state variables
const tutorials = ref([]);
const currentTutorial = ref(null);
const currentIndex = ref(-1);
const title = ref("");

// fetch all tutorials
const retrieveTutorials = async () => {
  try {
    const response = await PostDataServices.getAll();
    tutorials.value = response.data;
    console.log(response.data);
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
    console.log(response.data);
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
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>