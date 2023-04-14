let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.pre('save', function (next) {

    bcrypt.hash(this.password, 10)
        .then((hash) => {
            this.password = hash
            next()
        })


})

userSchema.method('checkPassword', function (password) {

    return bcrypt.compare(password, this.password)
})

let User = mongoose.model('User', userSchema)

module.exports = User