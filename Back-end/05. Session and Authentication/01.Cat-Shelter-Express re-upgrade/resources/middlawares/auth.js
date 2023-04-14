let catService = require('../services/catServices')

let jwt = require('jsonwebtoken')
let SECRET = 'DSFDS35DD14F!CSS1'


function authMiddlaware(req, res, next) {

    if (req.cookies['jsonWebToken']) {
        jwt.verify(req.cookies['jsonWebToken'], SECRET, (err, token) => {
            if (err) {
                throw 'have problem with json web token'
            } else {
                req.user = token
                res.locals.user = token
                next()
            }


        })

    } else {
        next()

    }
}

async function authCatOwner(req, res, next) {
    let catId = req.params.id


    let needCat = await catService.getOneCat(catId)

    let ownerId = needCat.ownerId



    if (req.user) {
        if (req.user.userId == ownerId) {
            next()
        } else {
            res.status(400).send('this user is not authorize')
        }

    } else {
        res.status(400).send('this user is not authorize')
    }



}

module.exports = {
    authMiddlaware,
    authCatOwner
}