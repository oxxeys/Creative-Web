<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostDataServices from "../services/PostDataServices.js";

// router hooks
const route = useRoute();
const router = useRouter();

// reactive state
const currentTutorial = ref(null);
const message = ref("");

// fetch tutorial by id
const getTutorial = async (id) => {
  try {
    const response = await PostDataServices.get(id);
    currentTutorial.value = response.data;
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
};

// update published status
const updatePublished = async (status) => {
  if (!currentTutorial.value) return;

  const data = {
    id: currentTutorial.value.id,
    title: currentTutorial.value.title,
    description: currentTutorial.value.description,
    published: status,
  };

  try {
    await PostDataServices.update(currentTutorial.value.id, data);
    currentTutorial.value.published = status;
    console.log("Status updated:", status);
  } catch (e) {
    console.error(e);
  }
};

// update tutorial
const updateTutorial = async () => {
  try {
    await PostDataServices.update(currentTutorial.value.id, currentTutorial.value);
    message.value = "The tutorial was updated successfully!";
    console.log("Tutorial updated");
  } catch (e) {
    console.error(e);
  }
};

// delete tutorial
const deleteTutorial = async () => {
  try {
    await PostDataServices.delete(currentTutorial.value.id);
    console.log("Tutorial deleted");
    router.push({ name: "tutorials" });
  } catch (e) {
    console.error(e);
  }
};

// fetch tutorial on mount
onMounted(() => {
  message.value = "";
  getTutorial(route.params.id);
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>