const TextBox = document.getElementById("location")
document.getElementById("btn").addEventListener("click", getLocation)

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
}

function error() {
  alert("Sorry, no position available.");
}