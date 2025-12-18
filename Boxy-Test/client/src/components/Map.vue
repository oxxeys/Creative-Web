<!-- https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-vue/?step=3 
https://tomaszs2.medium.com/%EF%B8%8F-vue-options-api-to-composition-api-migration-cheat-sheet-2b9dc7a0fc93 
-->

<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
    }
});

mapboxgl.accessToken = "pk.eyJ1Ijoib3h4ZXlzIiwiYSI6ImNtamE0eGI2NjAweG8zZXNicmR3ejhza3AifQ.dhKshKBW7T4z7N5O8vBHsA";

const mapContainer = ref(null)
let map = null
const emit = defineEmits(["update:modelValue"])

const getLocation = () => {
    const center = map.getCenter();
    return { center: { lng: center.lng, lat: center.lat }, zoom: map.getZoom() }
}

const updateLocation = () =>
    emit("update:modelValue", getLocation());

onMounted(() => {
    const { center, zoom } = props.modelValue


    //initialise map
    map = new mapboxgl.Map({

        container: mapContainer.value,
        style: "mapbox://styles/mapbox/standard",
        center: [center.lng, center.lat],
        zoom
    })

    //call to db 

    //ask for all posts langitude + longitude markers - return as array

    //loop through the length of array, returning a new marker for each post entry 

    // Create a new marker.
    const marker = new mapboxgl.Marker()
        .setLngLat([-2.3877,51.3794]) 
        .addTo(map);

    map.on("move", updateLocation);
    map.on("zoom", updateLocation);
})

onBeforeUnmount(() => {
    map.off("move", updateLocation);
    map.off("zoom", updateLocation);
    map.remove()
    map = null

})
</script>

<style>
/* make the map container fill its parent */
.map-container {
    width: 100%;
    height: 100%;
}
</style>