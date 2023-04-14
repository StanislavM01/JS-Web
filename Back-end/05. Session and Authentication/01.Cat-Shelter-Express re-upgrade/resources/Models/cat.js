let mongoose = require('mongoose')

let catSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minLength: 5
    },
    upload: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory'
        }
    ],
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

let Cat = mongoose.model('Cat', catSchema)

module.exports = Cat