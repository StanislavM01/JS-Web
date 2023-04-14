let express = require('express')
let route = express.Router()
let catServices = require('../services/catServices')
const multer = require('multer')
const upload = multer()

let allBreeds = catServices.arrWithBreeds

route.get('/addCat', function (req, res) {
    res.render('addCat', { allBreeds })
})
route.get('/addBreed', function (req, res) {
    res.render('addBreed')
})

route.post('/addCat', function (req, res) {



    catServices.addCat(req.body)
    res.redirect('/')
    console.log(req.body)

})
route.post('/addBreed', function (req, res) {
    catServices.addBreed(req.body)
    res.redirect('/')
})

route.get('/edit/*', function (req, res) {
    let catId = req.params['0']
    let findNeedCat = catServices.getOneCat(catId)

    res.render('editCat', { findNeedCat })
})
route.post('/edit/*', function (req, res) {
    let catInfo = req.body
    let catId = req.params['0']
    catInfo.id = catId

    console.log(req.body)
    catServices.editOneCat(catInfo)
    res.redirect('/')

})
route.get('/search', function (req, res) {
    let catName = req.query.textInput
    let allCats = catServices.fillterCats(catName)
    console.log(allCats)
    res.render('index', { allCats })
})

module.exports = route