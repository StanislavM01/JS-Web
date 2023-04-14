let mongoose = require('mongoose')

function connectToDatabase(){
    return mongoose.connect('mongodb://127.0.0.1/mongoTest')
}

module.exports = connectToDatabase