let mongoose = require('mongoose')

let courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [4, 'the length of title should be minimum 4 symbols']
    },
    description: {
        type: String,
        required: true,
        minLength: [20, 'the length of description should be minimum 20 symbols']
    },
    image: {
        type: String,
        required: true,
        validate: [/^http[s]?:\/{2}/, 'the url address should be start with https:// or http://']
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    enrolledUsers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

})




let Course = mongoose.model('Course', courseSchema)

module.exports = Course