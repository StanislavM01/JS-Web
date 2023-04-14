let mongoose = require('mongoose')

let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate:[/^[a-zA-Z ]{6,}$/,'the title should contain minimum 6 symbols']
    },
    keyword: {
        type: String,
        required: true,
        validate:[/^\w{2,}$/,'the keyword should contain minimum 6 symbols']

    },
    location: {
        type: String,
        required: true,
        validate:[/^[a-zA-Z ]{1,15}$/,'the location should contain maximum 15 symbols']

    },
    date: {
        type: String,
        required: true,
        validate:[/^[0-9]{2}.[0-9]{2}.[0-9]{4}$/,'the date should contain exactly 10 symbols']

    },
    image: {
        type: String,
        required: true,
        validate:[/^http[s]?:\/\//,'the image url should start with http:// or https://']

    },
    description: {
        type: String,
        required: true,
        validate:[/^\w{6,}$/,'the description should contain minimum 8 symbols']

    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    votesOnPost: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    raiting: {
        type: Number,
        default: 0
    }
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post