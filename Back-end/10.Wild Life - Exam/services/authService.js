let User = require('../models/User')
let bcrypt = require('bcrypt')
let jwt = require('../utils/jwt')


function register(userInfo) {
    return User.create(userInfo)
}


async function login({ email, password }) {

    let userData = await User.findOne({ email })
    if (!userData) {
        throw new Error('username or password is invalid')
    }
    let isValidPassword = await checkPassword(userData.password, password)
    console.log(isValidPassword)
    if (!isValidPassword) {
        throw new Error('username or password is invalid')
    }

    return jwt.sign({ email, _id: userData._id })

}

function checkPassword(databasePassword, passwordFromInput) {
    console.log(databasePassword)
    console.log(passwordFromInput)

    return bcrypt.compare(passwordFromInput, databasePassword)
}

module.exports = {
    register,
    login,
    checkPassword
}