let mongoose = require('mongoose')

let housingSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [6, 'the min length on the name is 6 symbols'],
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Apartment', 'Villa', 'House']
    },
    year: {
        type: Number,
        min: [1850,'the year need to be between 1850 and 1950 inclusive'],
        max: [1950,'the year need to be between 1850 and 1950 inclusive'],
        required: true
    },
    city: {
        type: String,
        minLength: [4, 'the min length on the city is 4 symbols'],
        required: true
    },
    image: {
        type: String,
        required: true,
        validate:[/^http[s]?:\/{2}/,'the url address should be start with https:// or http://']
    },
    description: {
        type: String,
        maxLength: [60, 'the max length on the description is 60 symbols'],
        required: true
    },
    availablePieces: {
        type: Number,
        min: [0,'the available pieces should to be between 0 and 10 inclusive'],
        max: [10,'the available pieces should to be between 0 and 10 inclusive'],
        required: true
    },
    tenants: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


let Housing = mongoose.model('Housing', housingSchema)

module.exports = Housing
