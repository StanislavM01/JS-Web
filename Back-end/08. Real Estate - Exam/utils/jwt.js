let jsonWebToken = require('jsonwebtoken')

function sign(payload, secret) {
    let promise = new Promise(function (resolve, reject) {
        jsonWebToken.sign(payload, secret, function (err, token) {
            if (err) {
                reject(err)
            } else {
                resolve(token)
            }
        })
    })
    return promise
}

function verify(token, secret) {
    let promise = new Promise(function (resolve, reject) {
        jsonWebToken.verify(token, secret, function (err, decodedToken) {
            if (err) {
                reject(err)
            } else {
                resolve(decodedToken)
            }
        })
    })
    return promise
}

module.exports = {
    sign,
    verify
}