let express = require('express')
let route = express.Router()
let postService = require('../services/postService')
let errorMessage = require('../utils/errorMessage')
let { isLogged, isGuest } = require('../middlawares/authMiddlaware')
let { isOwner ,isNotOwner,isNotVotted} = require('../middlawares/postMiddlaware')


route.get('/create', isLogged, function (req, res) {
    res.render('posts/create')
})

route.post('/create', isLogged, async function (req, res) {
    let userId = req.user._id
    let postInfo = req.body

    try {
        let post = await postService.createPost({ ...postInfo, author: userId })
        await postService.addPostToUser(post._id, userId)
        res.redirect('/')

    } catch (err) {
        let error = errorMessage(err)
        res.render('posts/create', { error })

    }
})

route.get('/all', async function (req, res) {
    let allPosts = await postService.getAllPosts()
    res.render('posts/allPosts', { allPosts })
})

route.get('/:postId/details', async function (req, res) {
    let postId = req.params.postId
    let needPost = await postService.getOnePost(postId)
    console.log(needPost)
    let isOwner = req.user?._id == needPost.author._id
    let isVotted = needPost.votesOnPost.some(a => a._id == req.user?._id)
    let raiting = needPost.raiting
    let emailsOnAllVoters = needPost.votesOnPost.map(a => a.email).join(', ')

    res.render('posts/details', { ...needPost, isOwner, isVotted, raiting, emailsOnAllVoters })

})

route.get('/:postId/upVote', isLogged, isNotOwner,isNotVotted,async function (req, res) {
    let postId = req.params.postId
    let userId = req.user._id
    await postService.upVote(postId, userId)
    res.redirect(`/post/${postId}/details`)
})

route.get('/:postId/downVote', isLogged,isNotOwner,isNotVotted, async function (req, res) {
    let postId = req.params.postId
    let userId = req.user._id
    await postService.downVote(postId, userId)
    res.redirect(`/post/${postId}/details`)
})

route.get('/:postId/edit', isLogged, isOwner,async function (req, res) {
    let postId = req.params.postId
    let needPost = await postService.getOnePost(postId)
    console.log(needPost)

    res.render('posts/edit', { ...needPost })


})

route.post('/:postId/edit', isLogged,isOwner, async function (req, res) {
    let postId = req.params.postId
    let postInfo = req.body

    try {
        await postService.editOnePost(postId, postInfo)
        res.redirect(`/post/${postId}/details`)
    } catch (err) {
        let error = errorMessage(err)
        res.render('posts/edit', { error, ...postInfo, _id: postId })
    }


})

route.get('/:postId/delete', isLogged,isOwner, async function (req, res) {
    let postId = req.params.postId
    await postService.removeOnePost(postId)
    console.log(postId)
    res.redirect('/')

})
module.exports = route 