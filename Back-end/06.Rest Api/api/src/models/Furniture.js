let mongoose = require('mongoose')

let furnitureSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        min: [1950, 'the year need to be between 1950 and 2050 inclusive'],
        max: [2050, 'the year need to be between 1950 and 2050 inclusive'],

    },
    description: {
        type: String,
        minLength: [3, 'description should be minimum 3 symbols']
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    img: {
        type: String,
    },
    material: {
        type: String
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})



let Furniture = mongoose.model('Furniture', furnitureSchema)
module.exports = Furniture