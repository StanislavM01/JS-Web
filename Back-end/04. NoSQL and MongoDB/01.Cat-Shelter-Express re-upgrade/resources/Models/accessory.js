let mongoose = require('mongoose')

let accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

let Accessory = mongoose.model('Accessory', accessorySchema)

module.exports = Accessory