let jwt = require('jsonwebtoken')
let SECRET = 'DSFDS35DD14F!CSS1'

async function createJsonWebToken(payload) {

    let jsonwebtoken = await jwtSign(payload)
    return jsonwebtoken

}

function jwtSign(payload) {
    let promise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, (err, token) => {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
    return promise
}

module.exports = {
    createJsonWebToken
}