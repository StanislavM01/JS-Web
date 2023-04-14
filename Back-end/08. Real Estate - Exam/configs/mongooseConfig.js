let mongoose = require('mongoose')
let { DB_CONNECTION_URL } = require('../constants')

function databaseConnect() {
    mongoose.set('strictQuery', true)
    return mongoose.connect(DB_CONNECTION_URL)
}

module.exports = databaseConnect