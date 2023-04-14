let express = require('express')
let route = express.Router()
let postService = require('../services/postService')

route.get('/', async function (req, res) {
    res.render('home')
    
})

route.get('/my-posts', async function (req, res) {

    let userId = req.user._id
    let userPosts = await postService.getAllPostsOnUser(userId)
    res.render('posts/myPosts', { userPosts })

    console.log(userPosts)
})


module.exports = route