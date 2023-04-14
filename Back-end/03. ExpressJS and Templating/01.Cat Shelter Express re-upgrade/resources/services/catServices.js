
let arrWithCats = [{
    name: 'tafko',
    description: 'mnogo e gotin',
    upload: '/content/images/cat1.jpg',
    breed: 'Fluffy Cat',
    id: 1
},
{
    name: 'Mafko',
    description: 'super gotin',
    upload: '/content/images/cat2.jpg',
    breed: 'Fluffy Cat',
    id: 2
}
]

let arrWithBreeds = [{ breed: 'ulichna prevuzhodna' }, { breed: 'Fluffy Cat' }]

function addCat(data) {
    data.id = arrWithCats.length + 1
    data.upload = '/content/images/' + data.upload
    arrWithCats.push(data)
}
function addBreed(data) {
    arrWithBreeds.push(data)
}

function getOneCat(id) {
    let findNeedCat = arrWithCats.find(a => a.id == id)
    return findNeedCat
}
function editOneCat(catObj) {
    let findIndex = arrWithCats.indexOf(arrWithCats.find(a => a.id == catObj.id))

    arrWithCats[findIndex].name = catObj.nameInput
    arrWithCats[findIndex].description = catObj.descriptionInput
    arrWithCats[findIndex].breed = catObj.breedInput



}
function fillterCats(catName) {
    catName = catName.toLowerCase()
    let arrWithFillterCat = arrWithCats.filter(a => (a.name.toLowerCase()).includes(catName))
    return arrWithFillterCat
}

let catServices = {
    addCat,
    arrWithCats,
    addBreed,
    arrWithBreeds,
    getOneCat,
    editOneCat,
    fillterCats

}

module.exports = catServices