let { COOKIE_NAME, JWT_SECRET_KEY } = require('../constants')

let jwt = require('../utils/jwt')

function auth(req, res, next) {
    let token = req.cookies[COOKIE_NAME]

    if (token) {
        jwt.verify(token, JWT_SECRET_KEY)
            .then(decodedToken => {
                req.user = decodedToken
                res.locals.user = decodedToken
                next()
            })
            .catch(err => {
                res.status(401).render('404')
            })
    } else {
        next()
    }
}

function isAuth(req, res, next) {

    if (req.user) {
        next()
    } else {
        res.render('/')
    }

}

function isGuest(req, res, next) {

    if (!req.user) {
        next()
    } else {
        res.render('/')
    }

}

module.exports = {
    auth,
    isAuth,
    isGuest
}