const dotenv=require('dotenv')
dotenv.config()

let mySecret=process.env.MySecret//"I will never tell"
let apikey=process.env.MyAPIKey//25653264523894723

console.log(mySecret)
console.log(apikey)