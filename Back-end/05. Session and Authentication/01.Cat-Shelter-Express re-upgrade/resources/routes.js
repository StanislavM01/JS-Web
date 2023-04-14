let express = require('express')
let route = express.Router()


let catController = require('./controllers/catController')
let homeController = require('./controllers/homeController')
let accesorryController = require('./controllers/accessoryController')
let authController = require('./controllers/authControlller')
let middlaware = require('./middlawares/auth')

route.use(middlaware.authMiddlaware)
route.use('/cats/:id', middlaware.authCatOwner, catController)
route.use('/', homeController)
route.use('/accessory', accesorryController)
route.use('/auth', authController)


module.exports = route 