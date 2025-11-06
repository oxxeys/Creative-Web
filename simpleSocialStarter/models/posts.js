
// let postData=[
//     {
//         postid: 0,
//         message:"Hi!",
//         user: "Dave"
//     },
//     {
//         postid: 1,
//         message:"This is really cool!",
//         user: "Dave"
//     },
//     {
//         postid: 2,
//         message:"Im a random person",
//         user: "Jessie"
//     }
//     ,
//     {
//         postid: 3,
//         message:"I a post!",
//         user: "Jundabelle"
//     }
// ]

// let nextPostID = postData.length


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


module.exports={
    getPosts,
    addPost,
    getLatestNPosts,
}