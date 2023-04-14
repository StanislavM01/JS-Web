let User = require('../models/User')

let jwt = require('../utils/jwt')
let {JWT_SECRET_KEY} = require('../constants')

async function register(userInfo) {
    await User.create(userInfo)

}

async function login(userInfo) {
    let { username, password } = userInfo
    let user = await User.findOne({ username })

    if (!user) {
        throw new Error('invalid username or password')
    }

    let isValid = await user.checkPassword(password)

    if (!isValid) {
        throw new Error('invalid username or password')
    }

    let payload = {
        username: user.username,
        _id: user._id
    }
    return jwt.sign(payload, JWT_SECRET_KEY)
}



module.exports = {
    register,
    login
}