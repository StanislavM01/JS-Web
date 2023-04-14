let express = require('express')
let route = express.Router()
let accessoryService = require('../services/accessoryService')
let catService = require('../services/catServices')


route.get('/create', function (req, res) {
    res.render('accessory/create', { layout: 'accessory.hbs' })
})

route.post('/create', async function (req, res) {
    let { name, description, imageUrl } = req.body
    try {
        await accessoryService.addAccessory(name, description, imageUrl)

    } catch (err) {
        res.status(400).send(err.message)
    }
    res.redirect('/accessory/create')
})




module.exports = route