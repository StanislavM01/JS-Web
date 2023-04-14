let express = require('express')
let route = express.Router()
let catAccessoryController = require('./catAccessoryController')

let catServices = require('../services/catServices')


route.get('/addCat', async function (req, res) {
    let allBreeds = await catServices.getAllBreeds()
    res.render('addCat', { allBreeds })
})
route.get('/addBreed', function (req, res) {
    res.render('addBreed')
})

route.post('/addCat', async function (req, res) {

    await catServices.addCat(req.body)
    res.redirect('/')

})
route.post('/addBreed', async function (req, res) {

    await catServices.addBreed(req.body.breed)
    res.redirect('/')
})

route.get('/edit/*', async function (req, res) {
    let catId = req.params['0']
    let findNeedCat = await catServices.getOneCat(catId)

    res.render('editCat', { findNeedCat })
})
route.post('/edit/*', async function (req, res) {
    let catInfo = req.body
    let catId = req.params['0']
    catInfo._id = catId


   

    await catServices.editOneCat(catInfo)
    res.redirect('/')

})
route.get('/search', function (req, res) {
    let catName = req.query.textInput
    let allCats = catServices.fillterCats(catName)
    res.render('index', { allCats })
})

route.use('/:catId/accessory',catAccessoryController)
module.exports = route