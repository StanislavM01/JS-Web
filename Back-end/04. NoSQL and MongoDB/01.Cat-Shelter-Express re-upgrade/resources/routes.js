let express = require('express')
let route = express.Router()

let catController = require('./controllers/catController')
let homeController = require('./controllers/homeController')
let accesorryController = require('./controllers/accessoryController')

route.use('/cats', catController)
route.use('/', homeController)
route.use('/accessory', accesorryController)


module.exports = route