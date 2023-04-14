let mongoose = require('mongoose')
let bcrypt = require('bcrypt')

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate:[/^[a-zA-Z]{3,}$/,'the first name should be contain minimum 3 symbols']
    },
    lastName: {
        type: String,
        required: true,
        validate:[/^[a-zA-Z]{5,}$/,'the last name should be contain minimum 3 symbols']
    },
    email: {
        type: String,
        required: true,
        validate:[/^[a-zA-Z]+@[A-Za-z]+\.[a-zA-Z]+$/,'the email is not valid']
    },
    password: {
        type: String,
        required: true,
        validate:[/^\w{4,}$/,'the last name should be contain minimum 3 symbols']
    },
    myPosts: [
        {
            type:mongoose.Types.ObjectId,
            ref:'Post'
            
        }
    ]
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hashPassword => {
            this.password = hashPassword
            next()
        })
        .catch(() => {
            next('please try again to register')
        })

})

let User = mongoose.model('User', userSchema)

module.exports = User 