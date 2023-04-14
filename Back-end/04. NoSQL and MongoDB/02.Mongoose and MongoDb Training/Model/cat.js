let mongoose = require('mongoose')

let catSchema = new mongoose.Schema({
    catName: String,
    age: {
        type: Number,
        required: true,
        min: 1
    }
})

let Cat = mongoose.model('Cat',catSchema)

module.exports = Cat