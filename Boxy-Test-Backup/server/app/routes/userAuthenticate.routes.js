module.exports = app => {

  const authenticate = require("../controllers/userAuthenticate.controller.js");

  var router = require("express").Router();

  //post requests -----

  // Create a new user
  router.post("/createUser", authenticate.createUser);

  // login user
  router.post("/Login", authenticate.Login);

  //change username
  router.post("/changeUsername", authenticate.changeUsername);

  //change pass
  router.post("/changePassword", authenticate.changePassword);


  //get requests -----

  // when called, if session exists, send back username otherwise null
  router.get("/checkSession", (req, res) => {
    res.send({
      username: req.session.username || null
    });
  });

  // logout user 
  router.post("/logout", authenticate.logOut)

  //get username of user from session + return it to front end
  router.get("/fetchUserInfo", (req, res) => {
    res.send({
      username: req.session.username || null
    });
  });

  // change the route of /create user to be /authenticate/boxy/createUser 
  app.use('/api/authenticate/boxy', router);
}