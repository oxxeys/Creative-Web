<template>
    <div class="col-md-12 min-vh-100 mb-3">
        <h4 style="padding-bottom: 50px;">Boxy Sightings!</h4>
        <div class="p-3 d-flex flex-column justify-content-center align-items-center ">
            <div class="cameraPost" :class="{ active: index === currentIndex }"
                v-for="(post, index) in posts" :key="post._id" @click="setActivePost(post, index)">
                <div style="margin-bottom: 200px;" class="box-parentPost"> 
                    <div class="planePost front-plane">
                        <p class="z-index-4 position-relative m-4 title">{{ post.title }}</p>
                        <p class="z-index-4 position-relative description">{{ post.description }}</p>
                        <p class="z-index-4 position-relative username" style="color: #fff;"> {{ post.username }}</p>
                    </div>
                    <div class="planePost top-plane"></div>
                    <div class="planePost bottom-plane"></div>
                    <div class="planePost left-plane"></div>
                    <div class="planePost right-plane"></div>
                    <div class="planePost back-plane"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import PostDataServices from "../services/PostDataServices.js";

// state variables
const posts = ref([]);
const currentPost = ref(null);
const currentIndex = ref(-1);
const title = ref("");
// const singlePostLocation = []


// fetch all posts
const retrievePosts = async () => {
  try {
    const response = await PostDataServices.getAll();
    response.data.reverse()
    posts.value = response.data;
  } catch (e) {
    console.error(e);
  }
};

// refresh list
const refreshList = () => {
  retrievePosts();
  currentPost.value = null;
  currentIndex.value = -1;
};

// set active post
const setActivePost = (post, index) => {
  currentPost.value = post;
  currentIndex.value = index;
};

// delete all posts
const removeAllPosts = async () => {
  try {
    const response = await PostDataServices.deleteAll();
    // console.log(response.data);
    refreshList();
  } catch (e) {
    console.error(e);
  }
};

// search posts by title
const searchTitle = async () => {
  try {
    const response = await PostDataServices.findByTitle(title.value);
    posts.value = response.data;
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
};

// fetch posts when component mounts
onMounted(retrievePosts);
</script>


<style>
:root {
  --sizeBox: 200px;
  --iteration: 1;
}

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.title{
font-size:x-large;
}
.description{
    font-size: medium;
}
.username{
    text-decoration: underline;
    color: #fff;
}


/* https://dev.to/martinp/how-to-do-stunning-3d-with-pure-htmlcss-ah */
.cameraPost {
  width: var(--sizeBox);
  margin: 0 auto; 
  
  position: relative;
  perspective: 800px;
  perspective-origin: 50% -100px;
}


.box-parentPost {
  width: var(--sizeBox);
  aspect-ratio: 1;
  
  position: relative;
  transform-style: preserve-3d;
  transform-origin: calc(var(--sizeBox)/2) bottom calc(calc(var(--sizeBox)/2)*-1);
  transform: rotateY(-10deg)

}



.animate {
  /* tell keyframes what animation we want*/
  animation: rotate 15s linear infinite;
}

.planePost {
  position: absolute;
  width: var(--sizeBox);
  aspect-ratio: 1;
  transform-style: preserve-3d;
}

.planePost.front-plane {
  background-color: #e99f59;
  padding: 10px;
  min-height: 275px;
  max-height: 275px;
}

.planePost.bottom-plane {
  top: 100%;
  transform-origin: top;
  /* set where to apply transformation from */
  transform: rotateX(-90deg);
  /* apply rotation on X axis */
  background-color: #b67701;
}

.planePost.top-plane {
  bottom: 100%;
  transform-origin: bottom;
  transform: rotateX(90deg);
  background-color: #f7af6b;
}

.planePost.back-plane {
  bottom: 200%;
  transform-origin: center calc(var(--sizeBox)*1.5) calc(calc(var(--sizeBox)/2)*-1);
  transform: rotateX(180deg);
  background-color: #e6a86f;
}

.planePost.right-plane {
  left: 100%;
  transform-origin: left;
  transform: rotateY(90deg);
  background-color: #f3a761;
  min-height: 275px;
  max-height: 275px;
}

.planePost.left-plane {
  right: 100%;
  transform-origin: right;
  transform: rotateY(-90deg);
  background-color: #dd9552;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotateY(360deg);
  }
}

@media (max-width: 400px) {
:root {
  --sizeBox: 150px;
  font-size: small;
}
.cameraPost {
  perspective-origin: 50% -200px;
}
.planePost.right-plane {
  left: 100%;
}
}
</style>