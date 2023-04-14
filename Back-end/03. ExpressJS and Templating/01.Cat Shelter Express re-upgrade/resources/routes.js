let express = require('express')
let route = express.Router()

let catController = require('./controllers/catController')
let homeController = require('./controllers/homeController')

route.use('/cats', catController)
route.use('/',homeController)


module.exports = route