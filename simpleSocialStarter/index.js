const express= require('express')
const app=express()
const path=require('path')

const posts = require("./models/posts.js")
const userModel = require("./models/users.js")

const { request } = require('http')
const req = require('express/lib/request.js')

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})

app.use(express.static('public'))

app.use(express.urlencoded({extended: false}))

app.get('/app', (request, response)=>{
    response.sendFile(path.join(__dirname, '/views', 'app.html'))
})

app.get('/login', (request, response)=>{
    response.sendFile(path.join(__dirname, '/views', 'login.html'))
})

app.get('/register', (request, response)=>{
    response.sendFile(path.join(__dirname, '/views', 'register.html'))
})

app.get('/logout', (request, response)=>{
    response.sendFile(path.join(__dirname, '/views', 'logout.html'))
})

app.get('/getposts', (request, response)=>{
    response.json({posts:posts.getPosts()}) // dont forget to prefix as it is required from elsewhere
})

app.post("/newpost", (request, response)=>{
    posts.addPost(request.body.message, "Current User")
    response.sendFile(path.join(__dirname, '/views', 'app.html'))
})



app.post('/login', (request, response)=>{
    if(userModel.checkUser(request.body.username, request.body.password)){
        response.sendFile(path.join(__dirname, '/views', 'app.html'))
    } else{
        response.sendFile(path.join(__dirname, '/views', 'notloggedin.html'))
    }
})
app.post('/register', (request, response)=>{
    if(userModel.addUser(request.body.username, request.body.password)){
        response.sendFile(path.join(__dirname, '/views', 'app.html'))
    } else{
        response.sendFile(path.join(__dirname, '/views', 'registration_failed.html'))
    }

})

app.get('/getuser', (request, response)=>{
    response.json({user:users.getUser()})
})

app.post("/register", (request, response)=>{
    user.addUser(request.body.username, request.body.password)
    response.sendFile(path.join(__dirname, '/views', 'register.html'))
})