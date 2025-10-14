const dotenv=require('dotenv')
dotenv.config()


//import hidden fron .env
let mySecret=process.env.MySecret
let apikey=process.env.MyAPIKey

console.log(mySecret)
console.log(apikey)