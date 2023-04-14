let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'the email or password is invalid']
    },
    password: {
        type: String,
        required: true,
    }
})


userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hashPassword => {
            this.password = hashPassword
            next()
        })
        .catch(err => {
            throw err
        })
})

let User = mongoose.model('User', userSchema)
module.exports = User