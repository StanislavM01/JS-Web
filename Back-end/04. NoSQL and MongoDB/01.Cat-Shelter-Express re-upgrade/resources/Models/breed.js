let mongoose = require('mongoose')

let breedSchema = new mongoose.Schema({
    breed: {
        type: String,
        required: true
    }
})

let Breed = mongoose.model('Breed', breedSchema)

module.exports = Breed