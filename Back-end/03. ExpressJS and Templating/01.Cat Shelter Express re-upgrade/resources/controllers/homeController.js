let express = require('express')
let route = express.Router()

let catServices = require('../services/catServices')
let allCats = catServices.arrWithCats

route.get('/', function (req, res) {
    res.render('index', { allCats })
})

module.exports = route