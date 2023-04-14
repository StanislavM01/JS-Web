let mongoose = require('mongoose')

let configDb = () => {
    mongoose.connect('mongodb://127.0.0.1/mongoTest')
    console.log('Connected to Database')
}
module.exports = configDb
