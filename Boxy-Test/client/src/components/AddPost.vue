<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required v-model="tutorial.title" name="title" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input class="form-control" id="description" required v-model="tutorial.description" name="description" />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import PostDataServices from "../services/PostDataServices.js";

// reactive tutorial object
const tutorial = reactive({
  _id: null,
  title: "",
  description: "",
  published: false,
});

// submitted flag
const submitted = ref(false);

// save tutorial method
const saveTutorial = async () => {
  const data = {
    title: tutorial.title,
    description: tutorial.description,
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
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>