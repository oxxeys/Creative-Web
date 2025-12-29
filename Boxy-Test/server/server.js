// https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/

// setup 
const express = require("express");

const cors = require("cors");

const sessions = require("express-session")
const cookieParser = require("cookie-parser")

const app = express();

const threeMiniutes = 3 * 60 * 1000
const oneHour = 1 * 60 * 60 * 1000

app.use(sessions({
    secret: "SEcRET CODE", // this is typically stroed in the .env file
    cookie: { maxAge: threeMiniutes },
    resave: false,
    saveUninitialized: false
}))


// const multer=require("multer")
// const upload = multer({dest: "./app/uploads"})


// get db object from /models (defaults to index.js)
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


// cors allows the frontend to access the server due to running on diffrent ports
// origin set up where we allow data requests to come from 
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true,
})); // this was fixed using chatgpt asking why cookie parser wouldnt work -> cors was blocking cookies

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
require("./app/routes/userAuthenticate.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});