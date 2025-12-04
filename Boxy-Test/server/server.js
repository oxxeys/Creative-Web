// https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/

// setup 
const express = require("express");

const cors = require("cors");

const app = express();

// get db object from /models 
const db = require("./app/models");


//attempt to connect to the db - essentially just setting it up here but doing nothing with it
const mongoose = require("mongoose")
mongoose.connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// set up where we allow data requests to come from 
var corsOptions = {
  origin: "http://localhost:5173" 
};

//cors allows the frontend to access the server due to running on diffrent ports
app.use(cors());

// parses application/json
app.use(express.json());       
// parses form data
app.use(express.urlencoded({ extended: true })); 


// base route set incase someone finds the port of my server
app.get("/", (req, res) => {
  res.json({ message: "Welcome to oxxeys application." });
});

// call routes - which returns 
require("./app/routes/boxy.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});