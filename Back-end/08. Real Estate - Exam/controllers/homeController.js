let express = require('express')
let route = express.Router()

let housingService = require('../services/housingService')

route.get('/', async function (req, res) {
    let housings = await housingService.getLastThreeHousing()
    res.render('home', { housings })
})

route.get('/search', async function (req, res) {
    let requirement = req.query.text
    console.log(requirement)
    res.render('search')
})
route.post('/search', async function (req, res) {
    let housingType = req.body.text
    let housing = await housingService.search(housingType)
    res.render('search', { housing })
})



module.exports = route