let express = require('express')
let route  = express.Router()

let userController = require('./controllers/userController')
let furnitureController = require('./controllers/furnitureController')

route.use('/users',userController)
route.use('/data/catalog',furnitureController)

module.exports = route