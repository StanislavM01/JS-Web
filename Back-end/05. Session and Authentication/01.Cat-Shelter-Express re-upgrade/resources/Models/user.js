let mongoose = require('mongoose')
let bcrypt = require('bcrypt')


let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'the username can hold only english letters and digits without spaces'],
        minLength: [5, 'the length of the username is minimum 5 letters']
    },
    password: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'the password can hold only english letters and digits'],
        minLength: [8, 'the length of the password is minimum 8 characters']
    }
})

userSchema.pre('save', async function () {
    let hashPassword = await bcrypt.hash(this.password,10)
    this.password = hashPassword
})

let User = mongoose.model('User', userSchema)

module.exports = User