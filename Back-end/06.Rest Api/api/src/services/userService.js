let User = require('../models/User')
let bcrypt = require('bcrypt')

async function login(userInfo) {
    let { email, password } = userInfo
    let user = await User.findOne({email})
    if (!user) {
        throw new Error('email or password is invalid')
    }
    let isCorrectPassowrd = bcrypt.compare(user.password, password)

    if (!isCorrectPassowrd){
        throw new Error('email or password is invalid')
    }

    return user

}


function register(userInfo) {
    return User.create(userInfo)
}

module.exports = {
    register,
    login
}