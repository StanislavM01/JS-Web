let postService = require('../services/postService')

async function isOwner(req, res, next) {
    let postId = req.params.postId
    let needPost = await postService.getOnePost(postId)

    let userId = req.user._id

    if (userId == needPost.author._id) {
        next()
    } else {
        res.redirect('error/404')
    }
}

async function isNotOwner(req, res, next) {

    let postId = req.params.postId
    let needPost = await postService.getOnePost(postId)

    let userId = req.user._id

    if (userId != needPost.author._id) {
        next()
    } else {
        res.redirect('error/404')
    }
}


async function isNotVotted(req, res, next) {

    let postId = req.params.postId
    let userId = req.user._id

    let needPost = await postService.getOnePost(postId)
    let isVotted = needPost.votesOnPost.some(a => a._id == userId)

    if (isVotted) {
        res.redirect('error/404')
    } else {
        next()
    }
}


module.exports = {
    isOwner,
    isNotOwner,
    isNotVotted
}