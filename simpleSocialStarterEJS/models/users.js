const mongoose=require("mongoose")
const {Schema, model} = mongoose

const userSchema = new Schema({
    username: String,
    fname: String,
    lname: String,
    password: String,
    admin: Boolean
})

const userData = model("users", userSchema)

async function addUser(fname, lname, username, password, admin){
    let found = null
    admin = false
    found = await userData.findOne({username:username}).exec()
    if(found){
        return false
    }else{
        let newuser ={ 
            fname: fname,
            lname: lname,
            username: username,
            password: password,
            admin:admin
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

async function changeFirstName(username,fname){
    await userData.findOneAndUpdate({username:username}, {$set: {fname:fname}} )
    return console.log("Changed First name")

}

async function changeLastName(username,lname){
    await userData.findOneAndUpdate({username:username}, {$set: {lname:lname}} )
    return console.log("Changed Last name")
}

async function getUserList(n=100){
    //return postData.get(-n).reverse()
    let foundData=[]
    foundData = await userData.find({}).limit(n)
    return foundData
}

async function findUser(deletePostMessage){

    let found = null
    found = await userData.findOne({message:deletePostMessage}).exec()

    return await userData.findOneAndDelete({message:deletePostMessage})
}

module.exports={
    checkUser,
    addUser,
    getUserDetails,
    changeLastName,
    changeFirstName,
    getUserList,
    findUser
}