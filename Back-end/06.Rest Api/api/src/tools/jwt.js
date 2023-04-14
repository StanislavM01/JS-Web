let jsonWebToken = require('jsonwebtoken')
let { JSON_SECRET_KEY } = require('../constants')

function sign(payload) {
    let promise = new Promise(function (resolve, reject) {
        jsonWebToken.sign(payload, JSON_SECRET_KEY, (err, token) => {
            if (err){
                reject(err)
            }else{
                resolve(token)
            }
        })
    })

    return promise
}

function verify(token) {
    let promise = new Promise(function (resolve, reject) {
        jsonWebToken.verify(token,JSON_SECRET_KEY,(error,decodedToken)=>{
            if(error){
                reject(error)
            }else{
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