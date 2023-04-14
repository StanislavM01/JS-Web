let express= require('express')
let route = express.Router()

let homeController = require('./controllers/homeController')
let authController= require('./controllers/authController')
let courseController = require('./controllers/courseController')

route.use(homeController)
route.use('/auth',authController)
route.use('/course',courseController)

module.exports = route