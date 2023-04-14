let express = require('express')
let route = express.Router()
let { isAuth } = require('../middlawares/authMiddlaware')
let getErrorMessage = require('../utils/errors')
let housingService = require('../services/housingService')

route.get('/', async function (req, res) {
    let housings = await housingService.getAllHousing()
    res.render('housing/index', { housings })
})

route.get('/create', isAuth, function (req, res) {
    res.render('housing/create')
})

route.post('/create', isAuth, async function (req, res) {
    let { name, type, year, city, image, description, availablePieces, } = req.body
    let userId = req.user._id

    try {
        await housingService.create({ name, type, year, city, image, description, availablePieces, owner: userId })
        res.redirect('/housing')

    } catch (err) {
        let errorMessage = getErrorMessage(err)
        res.render('housing/create', { error: errorMessage })
    }



})


route.get('/:housingId/details', async function (req, res) {
    let housingId = req.params.housingId
    let house = await housingService.getOneHousing(housingId)
    let houseData = house.toObject()
    console.log(house)

    let isOwner = req.user?._id == houseData.owner
    let isRentedFromCurrentUser = houseData.tenants.some(a => a._id == req.user?._id)
    let isAvailablePieces = houseData.availablePieces > 0


    res.render('housing/details', { ...houseData, isOwner, isRentedFromCurrentUser, isAvailablePieces })
})




route.get('/:housingId/rent', isOwner, async function (req, res) {
    let housingId = req.params.housingId
    let tenantId = req.user._id

    await housingService.addTenant(housingId, tenantId)

    res.redirect(`/housing/${housingId}/details`)
})

route.get('/:housingId/delete', isntOwner, async function (req, res) {
    let housingId = req.params.housingId

    await housingService.removeHousing(housingId)
    res.redirect('/housing')
})

route.get('/:housingId/edit', isntOwner, async function (req, res) {
    let housingId = req.params.housingId
    let house = await housingService.getOneHousing(housingId)
    let houseToObject = house.toObject()
    res.render('housing/edit', { ...houseToObject })
})

route.post('/:housingId/edit', isntOwner, async function (req, res) {

    let housingId = req.params.housingId
    let updateInfo = req.body

    try {
        await housingService.editHousing(housingId, updateInfo)
        res.redirect(`/housing/${housingId}/details`)
    } catch (err) {
        let house = await housingService.getOneHousing(housingId)
        let houseToObject = house.toObject()

        let errorMessage = getErrorMessage(err)
        res.render('housing/edit', { ...houseToObject, error: errorMessage })
    }



})
module.exports = route



async function isOwner(req, res, next) {
    let housingId = req.params.housingId
    let userInfo = req.body
    let housing = await housingService.getOneHousing(housingId)

    if (housing.owner == userInfo._id) {
        res.redirect(`/housing/${housingId}/details`)
    } else {
        next()
    }
}

async function isntOwner(req, res, next) {
    let housingId = req.params.housingId
    let userInfo = req.user
    let housing = await housingService.getOneHousing(housingId)



    if (housing.owner != userInfo._id) {
        res.redirect(`/housing/${housingId}/details`)

    } else {
        next()

    }
}


