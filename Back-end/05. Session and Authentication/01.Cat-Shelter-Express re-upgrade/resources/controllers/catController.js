let express = require('express')
let route = express.Router({ mergeParams: true })
let catAccessoryController = require('./catAccessoryController')
let path = require('path')

let catServices = require('../services/catServices')


route.get('/addCat', async function (req, res) {
    let allBreeds = await catServices.getAllBreeds()
    res.render('addCat', { allBreeds })
})
route.get('/addBreed', function (req, res) {
    res.render('addBreed')
})

route.post('/addCat', async function (req, res) {
    let { name, description, upload, breed } = req.body
    let userId = req.user.userId
    await catServices.addCat(name, description, upload, breed, userId)
    res.redirect('/')

})
route.post('/addBreed', async function (req, res) {

    await catServices.addBreed(req.body.breed)
    res.redirect('/')
})

route.get('/edit', async function (req, res) {
    let catId = req.params.id
    let findNeedCat = await catServices.getOneCat(catId)

    res.render('editCat', { findNeedCat })
})
route.post('/edit', async function (req, res) {
    let {name,description,breed} = req.body
    let catId = req.params.id
    


    await catServices.editOneCat(name,description,breed,catId)
    res.redirect('/')

})
route.get('/search', function (req, res) {
    let catName = req.query.textInput
    let allCats = catServices.fillterCats(catName)
    res.render('index', { allCats })
})

route.get('/delete', async function (req, res) {
    let catId = req.params.id

    let needCat = await catServices.getOneCat(catId)


    res.render('deleteCat', { layout: 'accessory', ...needCat })
})

route.post('/:id/delete', async function (req, res) {
    let catId = req.params.id
    console.log(catId)
    await catServices.deleteOneCat(catId)
    res.redirect('/')
})

route.use('/accessory', catAccessoryController)

module.exports = route