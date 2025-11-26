// https://www.bezkoder.com/vue-node-express-mongodb-mevn-crud/

const express = require("express");

const cors = require("cors");

const app = express();


const db = require("./app/models");



const mongoose = require("mongoose")
mongoose.connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parses application/json
app.use(express.json());       
// parses form data
app.use(express.urlencoded({ extended: true })); 


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to oxxeys application." });
});

// call controller 
require("./app/routes/boxy.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});