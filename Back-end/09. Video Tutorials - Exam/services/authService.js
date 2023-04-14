let User = require('../models/User')
let bcrypt = require('bcrypt')
let jwt = require('../utils/jwt')

function register({ username, password }) {
    return User.create({ username, password })

}

async function login({ username, password }) {
    await User.validate({ username, password })
    let userData = await User.findOne({ username })

    if (!userData) {
        throw new Error('username or password is invalid')
    }

    let isValidPassword = await checkPassword({hashedPassword:userData.password, password})
    console.log(isValidPassword)
    if (!isValidPassword) {
        throw new Error('username or password is invalid')
    }

    return jwt.sign({ username, _id: userData._id })

}

function checkPassword({hashedPassword, passwordFromInput}) {
    console.log('checkpass')

    return bcrypt.compare(passwordFromInput, hashedPassword)
}



module.exports = {
    register,
    login,
    checkPassword
}