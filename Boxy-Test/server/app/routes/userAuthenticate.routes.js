module.exports = app => {

  const authenticate = require("../controllers/userAuthenticate.controller.js");

  var router = require("express").Router();


  // Create a new user
  router.post("/createUser", authenticate.createUser);

  // login user
  router.post("/login", authenticate.login);

  // change the route of /create user to be /authenticate/boxy/createUser 
  app.use('/api/authenticate/boxy', router);
}