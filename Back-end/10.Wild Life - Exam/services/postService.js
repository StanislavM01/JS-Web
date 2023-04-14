let Post = require('../models/Post')
let User = require('../models/User')

function createPost(postInfo) {
    return Post.create(postInfo)
}

function getAllPosts() {
    return Post.find({}).lean()
}

function getOnePost(postId) {
    return Post.findById(postId).populate('author').populate('votesOnPost').lean()
}

function addPostToUser(postId, userId) {
    return User.findByIdAndUpdate(userId, { $push: { myPosts: postId } })
}

async function editOnePost(postId, postInfo) {
    await Post.validate(postInfo)
    await Post.findByIdAndUpdate(postId, postInfo)
}
function removeOnePost(postId) {
    return Post.findOneAndDelete(postId)
}

function upVote(postId, userId) {
    return Post.findByIdAndUpdate(postId, {
        $push: { votesOnPost: userId },
        $inc: { raiting: 1 }
    })



}

function downVote(postId, userId) {
    return Post.findByIdAndUpdate(postId, {
        $push: { votesOnPost: userId },
        $inc: { raiting: -1 }
    })

}

function getAllPostsOnUser(userId) {
    return Post.find({ author: userId }).populate('author').lean()
}


module.exports = {
    createPost,
    getAllPosts,
    getOnePost,
    upVote,
    downVote,
    addPostToUser,
    editOnePost,
    removeOnePost,
    getAllPostsOnUser
}