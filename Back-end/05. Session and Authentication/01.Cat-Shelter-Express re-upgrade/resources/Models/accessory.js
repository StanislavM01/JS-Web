let mongoose = require('mongoose')

let accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^http[s]?:\/\/\w+/, 'the url should start with "https://" or "http://"']
    },
    description: {
        type: String,
        required: true
    },
    

})

let Accessory = mongoose.model('Accessory', accessorySchema)

module.exports = Accessory