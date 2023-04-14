let jwt = require('jsonwebtoken')
let SECRET = 'gdsjkndosg390gwes9img4e!@#xcsdc'

function auth(req, res, next) {
    let token = req.cookies.jwt
    if (token) {
        jwt.verify(token, SECRET, (err, userInfo) => {
            if (err) {
                throw 'have problem with json web token'
            } else {
                req.userInfo = userInfo
            }

        })
    }
    next()
}

module.exports = {
    auth
}