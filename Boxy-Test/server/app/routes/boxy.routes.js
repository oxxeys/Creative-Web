module.exports = app => {
  const callDB = require("../controllers/boxy.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", callDB.create);

  // Retrieve all Tutorials
  router.get("/", callDB.findAll);

  // Retrieve all published Tutorials
  router.get("/published", callDB.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", callDB.findOne);

  // Update a Tutorial with id
  router.put("/:id", callDB.update);

  // Delete a Tutorial with id
  router.delete("/:id", callDB.delete);

  // Delete all Tutorials
  router.delete("/", callDB.deleteAll);

  app.use('/api/boxy', router);
};