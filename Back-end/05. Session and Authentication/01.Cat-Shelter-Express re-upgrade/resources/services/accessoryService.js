let Accessory = require('../Models/accessory')

async function addAccessory( name, description, imageUrl ) {

    await Accessory.create({
        name,
        description,
        imageUrl
    })
}

async function getAllAccessory() {
    let result = await Accessory.find({}).lean()
    return result
}
async function unUsedAccessory(accessoryIds) {
    let result = await Accessory.find({ _id: { $nin: accessoryIds } }).lean()
    return result
}



module.exports = {
    addAccessory,
    getAllAccessory,
    unUsedAccessory
}