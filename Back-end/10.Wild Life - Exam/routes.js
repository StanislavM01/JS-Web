let express = require('express')
let route = express.Router()

let homeController = require('./controllers/homeController')
let authController = require('./controllers/authController')
let postController = require('./controllers/postController')

route.use(homeController)
route.use('/auth', authController)
route.use('/post', postController)
route.use('*', (req, res) => res.render('error/404'))

module.exports = route