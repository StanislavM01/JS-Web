let mongoose = require('mongoose')

let carSchema = new mongoose.Schema({
    carBrand:String,
    carModel:String
})

let Car = mongoose.model('Car',carSchema)

module.exports = Car