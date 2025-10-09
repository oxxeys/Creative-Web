
let postData=[
    {
        postid: 0,
        message:"Hi!",
        user: "Dave"
    },
    {
        postid: 1,
        message:"This is really cool!",
        user: "Dave"
    },
    {
        postid: 2,
        message:"Im a random person",
        user: "Jessie"
    }
]

let nextPostID = postData.length

function getPosts(){
    return postData.slice()
}



function addPost(message, user){
    let newpost ={
        postID: nextPostID,
        message: message, 
        user: user
    }
    postData.push(newpost)
}


module.exports={
    getPosts,
    addPost
}