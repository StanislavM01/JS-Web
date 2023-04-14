let Cat = require('../Models/cat')
let Breed = require('../Models/breed')
let Accessory = require('../Models/accessory')



async function getAllCats() {
    let result = await Cat.find({}).lean()
    return result
}

async function addCat({ name, description, upload, breed }) {

    upload = '/content/images/' + upload
    await Cat.create({
        name,
        description,
        upload,
        breed
    })
}

async function addBreed(data) {
    await Breed.create({
        breed: data
    })
}

async function getOneCat(id) {
    let findNeedCat = await Cat.findById(id).populate('accessories').lean()
    return findNeedCat
}
async function editOneCat({ name, description, breed, _id }) {
    console.log(name)
    await Cat.findByIdAndUpdate(_id, {
        name,
        description,
        breed
    })


}
function fillterCats(catName) {
    catName = catName.toLowerCase()
    let arrWithFillterCat = arrWithCats.filter(a => (a.name.toLowerCase()).includes(catName))
    return arrWithFillterCat
}

async function getAllBreeds() {
    let result = await Breed.find({}).lean()
    return result
}

async function attachAccessory(catId, accessoryId) {
    let cat = await Cat.findById(catId)
    let accessory = await Accessory.findById(accessoryId)

    cat.accessories.push(accessory)
    cat.save()

}

let catServices = {
    addCat,
    addBreed,
    getOneCat,
    editOneCat,
    fillterCats,
    getAllCats,
    getAllBreeds,
    attachAccessory

}

module.exports = catServices