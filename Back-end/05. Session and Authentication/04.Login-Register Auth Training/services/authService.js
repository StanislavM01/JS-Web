let uniqId = require('uniqid')
let bcrypt = require('bcrypt')

let allUsers = [
    {
        id: '8fmvsn7iglb850ha0',
        name: 'pedali',
        hashPassword: '$2b$10$27EspNdUxRS4PtoeqCf23uxsbb2ip3FiO9fzJhBsFfhLhQbZjxo2u'
    }
]


async function register(name, password) {
    let needUser = allUsers.find(a => a.name == name)

    if (needUser) {
        throw new Error('this user already have register')
    }

    let hashPassword = await bcrypt.hash(password, 10)
    console.log(hashPassword)
    let user = { id: uniqId(), name, hashPassword }
    allUsers.push(user)


}

async function login(name, password) {
    let user = allUsers.find((a) => a.name == name)
    console.log(user)
    if (!user) {
        throw new Error('the password or username not match')
    }

    let isValid = await bcrypt.compare(password,user.hashPassword)
    return isValid
}
 

module.exports = {
    register,
    login,
    allUsers
}