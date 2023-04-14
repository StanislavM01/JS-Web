let express = require('express')
let route = express.Router()

let furnitureService = require('../services/furnitureService')



route.get('/', async function (req, res) {
    if (req.query.where) {
        let userId = req.user._id
        let allFurnitureOnCurrentUser = await furnitureService.getAllFurnitureOnUser(userId)

        res.json(allFurnitureOnCurrentUser)

    } else {
        let allFurnitures = await furnitureService.getAllFurniture()
        res.json(allFurnitures)
    }

})

route.post('/', async function (req, res) {
    let userId = req.user._id
    let furnitureInfo = req.body
    console.log(userId)
    console.log(furnitureInfo)

    try {
        await furnitureService.createFurniture({ ...furnitureInfo, _ownerId: userId })

    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

route.get('/:furnitureId', async function (req, res) {
    let furnitureId = req.params.furnitureId
    let needFurniture = await furnitureService.getOneFurniture(furnitureId)

    res.json(needFurniture)
})

route.put('/:furnitureId', async function (req, res) {
    let furnitureId = req.params.furnitureId
    let furnitureInfo = req.body
    await furnitureService.editOneFurniture(furnitureId, furnitureInfo)

    res.json({ ok: true })
})

route.delete('/:furnitureId', async function (req, res) {
    let furnitureId = req.params.furnitureId
    await furnitureService.deleteOneFurniture(furnitureId)

    res.json({ ok: true })
})


module.exports = route