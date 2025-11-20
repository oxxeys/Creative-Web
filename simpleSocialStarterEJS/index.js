const express = require('express')
const app = express()
const path = require('path')

const posts = require("./models/posts.js")
const userModel = require("./models/users.js")

const { request } = require('http')
const req = require('express/lib/request.js')

const sessions = require("express-session")
const cookieParser = require("cookie-parser")

const threeMiniutes = 3 * 60 * 1000
const oneHour = 1 * 60 * 60 * 1000

const dotenv = require('dotenv').config()
const mongoDBUsername = process.env.mongoDBUsername
const mongoDBPassword = process.env.mongoDBPassword
const mongoAppName = process.env.mongoAppName
console.log(mongoDBUsername, mongoDBPassword, mongoAppName)

const connectionString = `mongodb+srv://${mongoDBUsername}:${mongoDBPassword}@creativeweb.rcrohxp.mongodb.net/${mongoAppName}?retryWrites=true&w=majority`

const mongoose = require("mongoose")
mongoose.connect(connectionString)


app.use(sessions({
    secret: "SEcRET CODE", // this is typically stroed in the .env file
    cookie: { maxAge: threeMiniutes },
    resave: false,
    saveUninitialized: false
}))


app.set("view engine", "ejs")


app.listen(3000, () => {
    console.log('listening on port 3000')
})

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

function checkLoggedIn(request, response, nextAction) {
    if (request.session) {
        if (request.session.username) {
            nextAction()
        } else {
            request.session.destroy()
            // response.sendFile(path.join(__dirname, '/views', 'notloggedin.html'))
            response.render("pages/notloggedin", { isLoggedIn: getLoggedStatus(request), isAdmin: checkAdmin(request), })
        }
    }
    else {
        request.session.destroy()
        // response.sendFile(path.join(__dirname, '/views', 'notloggedin.html'))
        response.render("pages/notloggedin", { isLoggedIn: getLoggedStatus(request), isAdmin: checkAdmin(request), })
    }
}

function getLoggedStatus(request) {
    return request.session && request.session.username
}

app.get('/app', checkLoggedIn, async (request, response) => {

    response.render("pages/app",
        {
            isAdmin: checkAdmin(request),
            isLoggedIn: getLoggedStatus(request),
            username: request.session.username,
            posts: await posts.getLatestNPosts(8)
        }
    )
})

app.get('/index', checkLoggedIn, (request, response) => {
    response.render("pages/index", { isLoggedIn: getLoggedStatus(request), isAdmin: checkAdmin(request) })
})

//index isnt used?

app.get('/profile', checkLoggedIn, async (request, response) => {
    //response.sendFile(path.join(__dirname, '/views', 'profile.html'))
    // response.render("pages/profile", { isLoggedIn: getLoggedStatus(request) })
    response.render("pages/profile",
        {
            isAdmin: checkAdmin(request),
            isLoggedIn: getLoggedStatus(request),
            username: request.session.username,
            fname: request.session.fname,
            lname: request.session.lname,

        }
    )
})


app.get('/login', (request, response) => {
    // response.sendFile(path.join(__dirname, '/views', 'login.html'))
    response.render("pages/login", { isLoggedIn: getLoggedStatus(request), isAdmin: checkAdmin(request) })
})

app.get('/register', (request, response) => {
    // response.sendFile(path.join(__dirname, '/views', 'register.html'))
    response.render("pages/register", { isLoggedIn: getLoggedStatus(request), isAdmin: checkAdmin(request) })
})

app.get('/logout', (request, response) => {
    // response.sendFile(path.join(__dirname, '/views', 'logout.html'))
    response.render("pages/logout", { isLoggedIn: getLoggedStatus(request), isAdmin: checkAdmin(request) })
})

app.post('/logout', (request, response) => {

    request.session.destroy()
    response.redirect("/")
})


app.get('/getposts', async (request, response) => {
    response.json({ posts: await posts.getLatestNPosts(8) }) // dont forget to prefix as it is required from elsewhere

})

app.post("/newpost", async (request, response) => {
    await posts.addPost(request.body.message, request.session.username)
    console.log(request.session.username)
    const latestPosts = await posts.getLatestNPosts(8)
    response.render("pages/app",
        {
            isAdmin: checkAdmin(request),
            isLoggedIn: getLoggedStatus(request),
            username: request.session.username,
            posts: latestPosts
        }
    )
})

app.post("/postliked", async (request, response) => {

    console.log(request.body.postMessage)
    //get number of likes
    await posts.amountOfLikes(request.body.postMessage)

    //rerender app
    const latestPosts = await posts.getLatestNPosts(8)
    await response.render("pages/app",
        {
            isAdmin: await checkAdmin(request),
            isLoggedIn: getLoggedStatus(request),
            username: request.session.username,
            posts: latestPosts
        }
    )
})


app.post('/login', async (request, response) => {
    if (await userModel.checkUser(request.body.username, request.body.password)) {

        const userFromDB = await userModel.getUserDetails(request.body.username);

        request.session.username = request.body.username
        request.session.fname = userFromDB.fname
        request.session.lname = userFromDB.lname
        request.session.admin = userFromDB.admin

        // response.render("pages/app",{isLoggedIn: getLoggedStatus(request)})
        response.render("pages/app",
            {
                isAdmin: checkAdmin(request),
                isLoggedIn: getLoggedStatus(request),
                username: request.session.username,
                posts: await posts.getLatestNPosts(8)
            }
        )
    } else {
        response.render("pages/notloggedin", { isLoggedIn: getLoggedStatus(request), isAdmin: checkAdmin(request), })

    }
})

app.get('/getuser', (request, response) => {
    response.json({ user: users.getUser() })
})


app.post('/register', async (request, response) => {
    console.log(request.body)
    const success = await userModel.addUser(request.body.fname, request.body.lname, request.body.username, request.body.password);
    if (success) {
        // response.sendFile(path.join(__dirname, '/views', 'app.html'));

        response.render("pages/app",
            {
                isAdmin: checkAdmin(request),
                isLoggedIn: getLoggedStatus(request),
                username: request.body.username,
                posts: await posts.getLatestNPosts(8) //awaiting here as it fixed a error that occasionally popped up - not sure why but posts werent being loaded all the time

            })
    } else {
        // response.sendFile(path.join(__dirname, '/views', 'registration_failed.html'))
        response.render("pages/notloggedin", { isLoggedIn: getLoggedStatus(request), isAdmin: checkAdmin(request) })
    }
});


app.post('/changefname', async (request, response) => {
    //take user input 
    //sear db by username then update first name
    console.log(request.body.fname)
    await userModel.changeFirstName(request.session.username, request.body.fname)
    request.session.fname = request.body.fname
    console.log(request.body.fname)

    await response.render("pages/profile",
        {
            isAdmin: checkAdmin(request),
            isLoggedIn: getLoggedStatus(request),
            username: request.session.username,
            fname: request.body.fname,
            lname: request.session.lname,
        }
    )

});

app.post('/changelname', async (request, response) => {
    //take user input 
    //sear db by username then update last name
    console.log(request.body.lname)
    await userModel.changeLastName(request.session.username, request.body.lname)
    request.session.lname = request.body.lname

    await response.render("pages/profile",
        {
            isAdmin: checkAdmin(request),
            isLoggedIn: getLoggedStatus(request),
            username: request.session.username,
            fname: request.session.fname,
            lname: request.body.lname,
        }
    )
});


app.get('/admin', checkLoggedIn, async (request, response) => {

    response.render("pages/admin",
        {
            isAdmin: checkAdmin(request),
            isLoggedIn: getLoggedStatus(request),
            username: request.session.username,
            posts: await posts.getLatestNPosts(8)
        }
    )
})

function checkAdmin(request) {
    return request.session && request.session.admin === true
}


app.post("/deletePost", async (request, response) => {

    // delete using deleteOne 


    //get post clicked
    await posts.findPost(request.body.deletePostMessage)

    //rerender app
    const latestPosts = await posts.getLatestNPosts(8)
    await response.render("pages/admin",
        {
            isAdmin: await checkAdmin(request),
            isLoggedIn: getLoggedStatus(request),
            username: request.session.username,
            posts: latestPosts
        }
    )
})

// send in users (same as posts) 

// -- likes
// (only works by message id)

// -- user first name + last name

// -- user edit profile

// -- admin only log in

// admin can see users and posts and delete them (dont see passwords)

// just need to configure this