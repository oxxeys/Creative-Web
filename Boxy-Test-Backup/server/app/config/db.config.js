//set up .env file
const dotenv = require('dotenv').config()
const mongoDBUsername = process.env.mongoDBUsername
const mongoDBPassword = process.env.mongoDBPassword
const mongoAppName = process.env.mongoAppName

// export the url back to index.js
module.exports = {
  url: `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@creativeweb.rcrohxp.mongodb.net/${mongoAppName}?retryWrites=true&w=majority`
};