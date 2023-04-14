let express = require('express')
let route = express.Router()

let homeController = require('./controllers/homeController')
let authController = require('./controllers/authController')
let housingController = require('./controllers/housingController')

route.use(homeController)
route.use('/auth', authController)
route.use('/housing', housingController)

module.exports = route