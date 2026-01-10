<template>
  <div class=" row text-center justify-content-center align-items-center gap-5">

    <!-- col - column -->
    <!-- md - medium size screen styling -->
    <!-- 6 - 50% width due to 6/12 -->
    <div class="col-md-12 min-vh-100 p-3 d-flex flex-column ">


      <div class="camera d-flex flex-grow-1 flex-column justify-content-center align-items-center gap-5">
        <h1 class="pb-4">Where's Boxy?</h1>
        <div class="box-parent animate">
          <!-- maunally set width to overwrite styling set for below boxes -->
          <div class="plane front-plane"></div>
          <div class="plane back-plane"></div>
          <div class="plane top-plane"></div>
          <div class="plane bottom-plane"></div>
          <div class="plane left-plane"></div>
          <div class="plane right-plane"></div>
        </div>
        <p class="">boxy is an experiment with people</p> <!--  align-self-end -->
      </div>
    </div>



    <div class="vh-100 d-flex flex-column gap-3">
      <h2>Boxys Last Seen Location!</h2>
      <!-- <div id="sidebar">
        Longitude: {{ location.center.lng.toFixed(4) }} |
        Latitude:{{ location.center.lat.toFixed(4) }} |
        Zoom:{{ location.zoom.toFixed(2) }} |
      </div> -->
      <div class="w-100 h-75">
        <Map v-model="location" class="w-100 h-100" />
      </div>
    </div>


    <postComponent />

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PostDataServices from "../services/PostDataServices.js";
import Map from "./Map.vue";
import postComponent from "./PostComponent.vue"

// state variables
const post = ref([]);
const currentPost = ref(null);
const currentIndex = ref(-1);
const title = ref("");
// const singlePostLocation = []


// fetch all post
const retrievePosts = async () => {
  try {
    const response = await PostDataServices.getAll();
    post.value = response.data;
    // console.log(response.data);
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

// delete all post
const removeAllPosts = async () => {
  try {
    const response = await PostDataServices.deleteAll();
    // console.log(response.data);
    refreshList();
  } catch (e) {
    console.error(e);
  }
};

// search post by title
const searchTitle = async () => {
  try {
    const response = await PostDataServices.findByTitle(title.value);
    post.value = response.data;
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
};

// fetch post when component mounts
onMounted(retrievePosts);

onMounted(async () => {
  // fetch most recent posts
  // try {
  //     const res = await PostDataServices.mostRecentPost()

  //     let long = res.data.longitude[0]
  //     let lat = res.data.latitude[0]
  //     location.value.center = {lng: long, lat: lat}
  //     map.flyTo({
  //       center: {lng: long, lat: lat},
  //       essential: true
  //     })

  // } catch (e) {
  //     console.error(e)
  // }

})

const location = ref({
  center: { lng: -5.3877, lat: 51.3794 },
  zoom: 0,
})
</script>

<style>
 

.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}


/* https://dev.to/martinp/how-to-do-stunning-3d-with-pure-htmlcss-ah */
.camera {
  position: relative;
  perspective: 800px;
  perspective-origin: 50% -200px;
}

.box-parent {
   --size: 100px;
  width: var(--size);
  aspect-ratio: 1;

  position: relative;
  transform-style: preserve-3d;
  transform-origin: calc(var(--size)/2) bottom calc(calc(var(--size)/2)*-1);

  
}

.animate {
  /* tell keyframes what animation we want*/
  animation: rotate 15s linear infinite;
}

.plane {
  position: absolute;
  width: var(--size);
  aspect-ratio: 1;
  transform-style: preserve-3d;
}

.plane.front-plane {
  background-color: #e99f59;
}

.plane.bottom-plane {
  top: 100%;
  transform-origin: top;
  /* set where to apply transformation from */
  transform: rotateX(-90deg);
  /* apply rotation on X axis */
  background-color: #b67701;
}

.plane.top-plane {
  bottom: 100%;
  transform-origin: bottom;
  transform: rotateX(90deg);
  background-color: #f7af6b;
}

/*  calc(var(--size) - var(--size) - var(--size) */
.plane.back-plane {
  bottom: 200%;
  transform-origin: center calc(var(--size)*1.5) calc(calc(var(--size)/2)*-1);
  transform: rotateX(180deg);
  background-color: #e6a86f;
}

.plane.right-plane {
  left: 100%;
  transform-origin: left;
  transform: rotateY(90deg);
  background-color: #f3a761;
}

.plane.left-plane {
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
</style>