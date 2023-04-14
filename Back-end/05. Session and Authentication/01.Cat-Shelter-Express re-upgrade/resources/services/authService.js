let bcrypt = require('bcrypt')
let User = require('../Models/user')

async function register(username, password) {
    await User.create({
        username, password
    })


}

async function login(username, password) {
    let needUser = await User.findOne({ username })
    let isTruePassword = await bcrypt.compare(password, needUser.password)

    return isTruePassword

}

async function getUserId(username) {
    let user = await User.findOne({ username })
    let id = user._id
    return id
}


module.exports = {
    register,
    login,
    getUserId
}