// get db obj, then parse post obj from it
const db = require("../models");
const Post = db.posts;
// Create and Save a new Post
exports.create = (req, res) => {


  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  console.log(req.body)
  // Create a Post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    username: req.body.username,
  });

  // Save Post in the database
  post
    .save(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Post.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    });
};


// Find a most recent post long+lat
// used on map component to fly to most recent post
exports.mostRecentPost = (req, res) => {
  Post.findOne({})
    .sort({createdAt: -1})
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No posts to find?! Go make a post!"});
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving post!"});
    });
};


