
//say "hey! we want to use express"
const express = require("express")

//app is a new variable that creates a new instance of express
const app = express()

const path= require("path")

// if no root for resource look in public folder, if found use from there
app.use(express.static("./public")) 

//allows us to access url
app.use(express.urlencoded({extended: false}))

app.listen(3000, ()=>console.log("Listenin on port 3000"))


// tell server "if you get the request for /test, serve the content from /views/notATest.html"
// this is a controller
app.get("/test", (request, response)=>{
    response.sendFile(path.join(__dirname, "/views", "notATest.html"))
})

app.get("/application", (request, response)=>{
    response.sendFile(path.join(__dirname, "/views", "application.html"))
})

app.get("/getRabbits", (request, response)=>{
    response.json(data)
    console.log(data)
})

app.post("/newrabbit", (request, response)=>{
    let newRabbit={
        name: request.body.name,
        colour: request.body.name
    }

    data.rabbits.push(newRabbit)
    console.log(data)
})




let data = {
    rabbits:[
    {
        name: "rabbit1",
        colour: "white"
    },
    {
        name: "rabbit2",
        colour: "black"
    }
    
]
}

// wose way to do rabbit

// app.get("/getRabbits", (request, response)=>{
//     response.json[{rabbits: rabbitData}]
// })

// let rabbitData=[
//     {
//         name: "rabbit1",
//         colour: "white"
//     },
//     {
//         name: "rabbit2",
//         colour: "black"
//     }
    
// ]

