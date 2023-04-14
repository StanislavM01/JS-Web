let mongoose = require('mongoose')
let {CONNECTION_DATABASE_STRING} = require('../constants')

function databaseConnect() {
    mongoose.set('strictQuery', true)
    return mongoose.connect(CONNECTION_DATABASE_STRING)
}


module.exports = databaseConnect