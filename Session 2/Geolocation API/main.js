const TextBox = document.getElementById("location")
document.getElementById("btn").addEventListener("click", getLocation)
const SunTimes = document.getElementById("SunTimes")

let lat
let long

function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success,error);
    }
    else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function success(position){
    TextBox.innerHTML = "Latitude : " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    lat = position.coords.latitude;
    long = position.coords.longitude;
}

function error() {
  alert("Sorry, no position available.");
}

function getSunTime(){
  let urlBase="https://api.sunrise-sunset.org/json?"
  let queryURL=urlBase+"lat="+lat+"&lng="+long
  fetch(queryURL)
    .then(data=>data.json())
    .then(processSunTimes)
}

function processSunTimes(sunData){
  SunTimes.innerText="sunrise: "+ sunData.results.sunrise
}
