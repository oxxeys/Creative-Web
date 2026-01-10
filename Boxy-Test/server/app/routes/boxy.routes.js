//this file exports the controllers made in controller.js but through simple routes that can then be called on the frontend 

module.exports = app => {

  const callDB = require("../controllers/boxy.controller.js");

  var router = require("express").Router();

  // Create a new Post
  router.post("/", callDB.create);

  // Retrieve most recent post
  router.get("/mostRecentPost", callDB.mostRecentPost);

  // Retrieve all posts
  router.get("/", callDB.findAll);

  app.use('/api/boxy', router);
};