let Furniture = require('../models/Furniture')

function createFurniture(furnitureInfo) {
    return Furniture.create(furnitureInfo)
}

function getAllFurniture() {
    return Furniture.find({})
}

function getOneFurniture(furnitureId) {
    return Furniture.findById(furnitureId)
}

function editOneFurniture(furnitureId,furnitureInfo) {
    return Furniture.findByIdAndUpdate(furnitureId,furnitureInfo)
}

function getAllFurnitureOnUser(userId) {
    return Furniture.find({
        _ownerId:userId
    })
}
function deleteOneFurniture(furnitureId) {
    return Furniture.findByIdAndDelete(furnitureId)
}


module.exports = {
    createFurniture,
    getAllFurniture,
    getOneFurniture,
    editOneFurniture,
    getAllFurnitureOnUser,
    deleteOneFurniture
}