<!-- https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-vue/?step=3 
https://tomaszs2.medium.com/%EF%B8%8F-vue-options-api-to-composition-api-migration-cheat-sheet-2b9dc7a0fc93 
-->

<template>
    <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ref, onMounted, onBeforeUnmount, onBeforeMount } from "vue";
import PostDataServices from "../services/PostDataServices.js";
import { RouterLink } from "vue-router";

const props = defineProps({
    modelValue: {
        type: Object,
        required: true,
    }
});

mapboxgl.accessToken = "pk.eyJ1Ijoib3h4ZXlzIiwiYSI6ImNtamE0eGI2NjAweG8zZXNicmR3ejhza3AifQ.dhKshKBW7T4z7N5O8vBHsA";

const mapContainer = ref(null)
let map = null
let coordsFromDB = []
const markers = []
const coordinatesForLine = []

const emit = defineEmits(["update:modelValue"])

const getLocation = () => {
    const center = map.getCenter();
    return { center: { lng: center.lng, lat: center.lat }, zoom: map.getZoom() }
}

const updateLocation = () =>
    emit("update:modelValue", getLocation());

onMounted(async () => {
    const { center, zoom } = props.modelValue

    //initialise map
    map = new mapboxgl.Map({

        container: mapContainer.value,
        style: "mapbox://styles/mapbox/standard",
        center: [center.lng, center.lat],
        zoom
    })

    // fetch all posts
    try {
        const response = await PostDataServices.getAll()
        coordsFromDB = response.data
        // console.log(coordsFromDB)
    } catch (e) {
        console.error(e)
    }



    //ask for all posts langitude + longitude markers - return as array
    //loop through the length of array, returning a new marker for each post entry 
    map.on("load", () => {
        for (var i = 0; i < coordsFromDB.length; i++) {
            
            //can't pass straight in due to being an array already and mapbox doesnt seem to like that
            const long = coordsFromDB[i].longitude
            const lat = coordsFromDB[i].latitude
            coordinatesForLine.push([long, lat])


            // Create a new marker inside of the loop
            const marker = new mapboxgl.Marker()
                .setLngLat([coordsFromDB[i].longitude, coordsFromDB[i].latitude])
                .addTo(map);



            markers.push(marker)
        }
        // https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/
        map.addSource("routes", {
            "type": "geojson",
            data: {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "LineString",
                    "coordinates": coordinatesForLine
                }
            }
        })
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'routes',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#C08F4F',
                'line-width': 8
            }
        })



        map.on("move", updateLocation);
        map.on("zoom", updateLocation);
    })
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