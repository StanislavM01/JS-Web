let express = require('express')
let route = express.Router({ mergeParams: true })

let catService = require('../services/catServices')
let accessoryService = require('../services/accessoryService')

route.get('/details', async function (req, res) {
    let catId = req.params.catId
    let catInfo = await catService.getOneCat(catId)
    let accessories = catInfo.accessories
    console.log(catInfo)

    res.render('catAccessory/details', { ...catInfo, accessories, layout: 'accessory.hbs' })
})


route.get('/add', async function (req, res) {
    let catId = req.params.catId
    let catInfo = await catService.getOneCat(catId)
    let unUsedAccessory = await accessoryService.unUsedAccessory(catInfo.accessories.map(a => a._id))
    console.log(unUsedAccessory)

    res.render('catAccessory/add', { ...catInfo, unUsedAccessory, layout: 'accessory' })
})

route.post('/add', async function (req, res) {
    let catId = req.params.catId
    let accessoryId = req.body.accessory

    await catService.attachAccessory(catId, accessoryId)
    res.redirect(`/cats/${catId}/accessory/details`)

})



module.exports = route