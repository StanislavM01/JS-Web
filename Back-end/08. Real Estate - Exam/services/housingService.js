let Housing = require('../models/Housing')

async function create(houseData) {
    console.log(houseData)
    await Housing.create(houseData)

}

async function getLastThreeHousing() {
    let housing = await Housing.find({}).sort({ createdAt: -1 }).limit(3).lean()
    return housing
}

async function getAllHousing() {
    let housing = await Housing.find({}).lean()
    return housing
}
async function getOneHousing(id) {
    let housing = await Housing.findById(id).populate('tenants')
    return housing
}

async function addTenant(housingId, tenantId) {
    let house = await getOneHousing(housingId)

    house.tenants.push(tenantId)
    house.availablePieces -= 1
    await house.save()
}

function removeHousing(housingId) {
    return Housing.findByIdAndDelete(housingId)
}

function editHousing(housingId, updateInfo) {
    return Housing.findByIdAndUpdate(housingId, updateInfo, { runValidators: true })
}

async function search(housingType) {
    let housing = await Housing.find({ 'type': { $regex: housingType, $options: 'i' } }).lean()
    return housing
}


module.exports = {
    create,
    getLastThreeHousing,
    getAllHousing,
    getOneHousing,
    addTenant,
    removeHousing,
    editHousing,
    search
}