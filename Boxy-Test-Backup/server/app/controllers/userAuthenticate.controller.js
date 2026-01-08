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
    email: req.body.email,
    admin: false
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
exports.Login = async (req, res) => {

  //take in username and password from user
  var username = req.body.username
  //call db and check if username exists in db

  // call db and check for username
  let user = await userModel.findOne({ username: req.body.username }).exec();

  //check username exists in db
  if (user) // if true
  {
    //check password from db against password from user
    if (user.password == req.body.password) {
      //set session info to user
      req.session.username = user.username;
      // req.session.password = user.password;
      req.session.email = user.email;
      //return login successful + username
      return res.send({
        message: "Login successful",
        username: user.username,
      });
    }
    else {
      res.status(400).send({
        message:
          err.message || "Password wrong!"
      });
    }
  }
  else {
    err => {
      res.status(500).send({
        message:
          err.message || "Username not found!."
      })
    }
  }


}


// LogOut
exports.logOut = async (req, res) => {
  //destory session therefore logged out
  req.session.destroy()
  res.send({ message: "Logged Out" })
}

// change username 
exports.changeUsername = async (req, res) => {

  // Validate request isnt empty
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  await userModel.findOneAndUpdate({ username: req.session.username }, { $set: { password: req.body.username } }, { new: true })

  res.send({ username: req.body.username })

  req.session.username = req.body.username
};


// change password
exports.changePassword = async (req, res) => {

  // Validate request isnt empty
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //search db by username, when found, set password as new password
  await userModel.findOneAndUpdate({ username: req.body.username }, { $set: { username: req.body.password } }, { new: true })

  res.send("password set!")



};