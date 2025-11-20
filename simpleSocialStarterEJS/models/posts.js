const mongoose=require("mongoose")

const {Schema, model} = mongoose

const postSchema = new Schema({
    user: String,
    message: String,
    likes: Number,
    time: Date    
})

const postData = model("posts", postSchema)


function getPosts(){
    return postData.slice()
}

async function getLatestNPosts(n=3){
    //return postData.get(-n).reverse()
    let foundData=[]
    foundData = await postData.find({}).sort({"time": -1}).limit(n)
    return foundData
}


function addPost(message, user){
    let newpost ={
        message: message, 
        user: user,
        likes: 0,
        time: Date.now()
    }
    postData.create(newpost)
    .catch(err=>{console.log("error", err)})
}

//get user details and then return them
async function amountOfLikes(postMessage){
    console.log("add a like")

    // console.log(message)
    let found = null
    found = await postData.findOne({message:postMessage}).exec()
    console.log(found)
    console.log(found.likes)
    newLikes = found.likes + 1

    console.log(await postData.findOneAndUpdate({message:postMessage}, {$set: {likes:newLikes}} ))
    return await postData.findOneAndUpdate({message:postMessage}, {$set: {likes:newLikes}} )
}

async function findPost(deletePostMessage){

    let found = null
    found = await postData.findOne({message:deletePostMessage}).exec()

    return await postData.findOneAndDelete({message:deletePostMessage})
}

module.exports={
    getPosts,
    addPost,
    getLatestNPosts,
    amountOfLikes,
    findPost
}