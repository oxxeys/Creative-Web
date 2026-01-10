//get our db address that is stored in config file
const dbConfig = require("../config/db.config.js");

//set up mongoose and get it to use built in js promise 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// make an object to hold mongoose + url which makes it easier to send to other files
// and add a post + user schema 
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.posts = require("./boxyPost.model.js")(mongoose);
db.userModel = require("./boxyUser.model.js")(mongoose);

module.exports = db;