const mongoose=require("mongoose")
const {Schema, model} = mongoose

const userSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    password: String,
})

const userData = model("users", userSchema)

async function addUser(fname, lname, username, password){
    let found = null
    found = await userData.findOne({username:username}).exec()
    if(found){
        return false
    }else{
        let newuser ={ 
            fname: fname,
            lname: lname,
            username: username,
            password: password
        }
        await userData.create(newuser)
        return true
    }
}


async function checkUser(username, password){
    //return bool if user is there

    let found = null
    found = await userData.findOne({username:username}).exec()

    //let found=userData.find(thisUser=>thisUser.username==username) // arrow function that assigns each item in userData to "thisUser" temporarily, then checks if the username is equal to the username the client just inputted to the form 
    if(found){ // js treats a variable with a value as true, var with no value is false
        return found.password==password // checks password - if it is same then it will return true
    } else{
        return false
    }
}


//get user details and then return them
async function getUserDetails(username){
    let found = null
    found = await userData.findOne({username:username}).exec()
    //console.log(found)
    return found
}

async function changeLastName(username,lname){
    await userData.findOneAndUpdate({username:username}, {$set: {lname:lname}} )
    return console.log("Changed Last name")

}

module.exports={
    checkUser,
    addUser,
    getUserDetails,
    changeLastName
}