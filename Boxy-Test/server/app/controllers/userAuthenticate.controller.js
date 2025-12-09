const db = require("../models");
const userModel = db.userModel;

// Create User
exports.createUser = (req, res) => {

  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create user 
  const user = new userModel({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  // Save user to db
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding user to database!."
      });
    });
};


// Login User 
// async as to wait for db to reply
exports.login = async (req, res) => {

  //take in username and password from user

  //call db and check if username exists in db

  // call db
  let user = await userModel.findOne({ username: req.body.username }).exec();

  //check username exists in db
  if (user) // if invalid go to else
  {
    //check password

    //set session info to user

    //return login successful
  }
  else{
    res.status(400).send({
      message:
        err.message || "Password wrong!"
    });
  }




  async function checkUser(username, password) {
    //return bool if user is there

    let found = null
    found = await userData.findOne({ username: username }).exec()

    if (found) { // js treats a variable with a value as true, var with no value is false
      return found.password == password // checks password - if it is same then it will return true
    } else {
      return false
    }
  }

  //take in username and password from user

  //call db and check if username exists in db

 // const user = userModel.findOne({ username:req.body.username }).exec()

  if (await checkUser(req.body.username, req.body.password)) {

    //

    const userFromDB = userModel.getUserDetails(req.body.username);
    req.session.username = req.body.username
    req.session.fname = userFromDB.fname
    req.session.lname = userFromDB.lname
    req.session.admin = userFromDB.admin

    return res.send({ message: "Login successful" });

  } else {
    res.status(500).send({
      message:
        err.message || "User does not exist in the db!"
    });
  }
};


// LogOut
exports.logOut = async (req, res) => {
  //destory session therefore logged out
  request.session.destroy()
}