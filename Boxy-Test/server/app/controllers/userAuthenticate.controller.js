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