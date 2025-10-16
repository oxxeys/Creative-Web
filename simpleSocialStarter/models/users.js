let userData=[
    {
        username: "user1",
        password: "123",
    },
    {
        username: "a",
        password: "a",
    }
]

let nextuserID = userData.length
function addUser(username, password){
    let found=userData.find(thisUser=>thisUser.username==username)
    if(found){
        return false
    }else{
        let newuser ={ 
            userID: nextuserID,
            username: username,
            password: password
        }
        userData.push(newuser)
        return true
    }



}

function checkUser(username, password){
    //return bool if user is there
    let found=userData.find(thisUser=>thisUser.username==username) // arrow function that assigns each item in userData to "thisUser" temporarily, then checks if the username is equal to the username the client just inputted to the form 
    if(found){ // js treats a variable with a value as true, var with no value is false
        return found.password==password // checks password - if it is same then it will return true
    } else{
        return false
    }
}



module.exports={
    checkUser,
    addUser
}