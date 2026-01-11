<template>
  <div class=" row text-center justify-content-center align-items-center gap-5">

    <!-- col - column -->
    <!-- md - medium size screen styling -->
    <!-- 6 - 50% width due to 6/12 -->
    <div class="col-md-12 min-vh-100 p-3 d-flex flex-column ">


      <div  class="camera d-flex flex-grow-1 flex-column justify-content-center align-items-center gap-5">
        <h1 class="pb-4">Where's Boxy?</h1>
        <div class="box-parent box" id="boxParentToScroll">
          <!-- maunally set width to overwrite styling set for below boxes -->
          <div class="plane front-plane"></div>
          <div class="plane back-plane"></div>
          <div class="plane top-plane"></div>
          <div class="plane bottom-plane"></div>
          <div class="plane left-plane"></div>
          <div class="plane right-plane"></div>
        </div>
        <p class="">boxy is an experiment with people and a box</p> <!--  align-self-end -->
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


    <postComponent/>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PostDataServices from "../services/PostDataServices.js";
import Map from "./Map.vue";
import postComponent from "./PostComponent.vue"
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"



// state variables
const post = ref([]);
const currentPost = ref(null);
const currentIndex = ref(-1);
const title = ref("");
// const singlePostLocation = []

// fetch all post
// need to fetch posts here as it is the home page where map and posts are shown so data needs to be here
const retrievePosts = async () => {
  try {
    const response = await PostDataServices.getAll();
    post.value = response.data;
    // console.log(response.data);
  } catch (e) {
    console.error(e);
  }
};

// fetch post when component mounts
onMounted(retrievePosts);

const location = ref({
  center: { lng: -5.3877, lat: 51.3794 },
  zoom: 0,
})

onMounted(() => {
  // GSAP Code
gsap.registerPlugin(ScrollTrigger)

gsap.to("#boxParentToScroll", {
  rotateY:360,
  repeat:-1,
  ease:"none",
  duration:10,
})

let tl = gsap.timeline({
  scrollTrigger: {
        trigger: '.box',  // this will use the box as the trigger
        start: "center center", //start when top of box hits 80% of screen down
        end: "+=1000", // Sets where the animation ends - when the bottom of the element hits 300px after we've scrolled
        scrub: true,
        //markers: true,
    },
})

tl.to(".bottom-plane", {y:200}, 0)
  .to(".back-plane", {z:-400}, 0)
  .to(".top-plane", {y:-200}, 0)
  .to(".right-plane", {x:400}, 0)
  .to(".left-plane", {x:-400}, 0)
  .to(".front-plane", {z:400}, 0)
  .to("#boxParentToScroll", {y:800}, 0)
  .to(".plane", {opacity: 0},0) 

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