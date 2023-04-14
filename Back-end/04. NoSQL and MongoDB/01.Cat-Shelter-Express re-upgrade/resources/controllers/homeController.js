let express = require('express')
let route = express.Router()

let catServices = require('../services/catServices')

route.get('/', async function (req, res) {
    let allCats = await catServices.getAllCats()

    res.render('index', { allCats })
})

module.exports = route