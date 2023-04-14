let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]{5,}/, 'the username should be minimum 5 symbols length with english letters and digits']
    },
    password: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]{5,}/, 'the password should be minimum 5 symbols length with english letters and digits']

    },
    enrolledCourses: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Course'
        }
    ]
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hashPassowrd => {
            this.password = hashPassowrd
            next()
        })
        .catch(() => {
            next('please try again to register')
        })

})

let User = mongoose.model('User', userSchema)

module.exports = User 