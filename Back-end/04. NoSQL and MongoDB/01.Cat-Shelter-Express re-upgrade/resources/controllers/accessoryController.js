let express = require('express')
let route = express.Router()
let accessoryService = require('../services/accessoryService')
let catService = require('../services/catServices')


route.get('/create', function (req, res) {
    res.render('accessory/create', { layout: 'accessory.hbs' })
})

route.post('/create', async function (req, res) {
    await accessoryService.addAccessory(req.body)
    res.redirect('/accessory/create')
})




module.exports = route