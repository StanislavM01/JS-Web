let { COOKIE_NAME } = require('../constants')
let { JSON_SECRET_KEY } = require('../constants')
let jwt = require('../tools/jwt')

async function auth(req, res, next) {
    let token = req.headers['x-authorization']
    try {
        if (token) {
            let userInfo = await jwt.verify(token)
            req.user = userInfo
            next()

        } else {
            next()
        }

    } catch (err) {
        res.status(401).json('you are not authorize')

    }




}

//  function isGuest(req, res, next) {
//  
//      if (!req.user) {
//          next()
//      } else {
//          res.redirect('error/404')
//      }
//  }
//  
//  function isLogged(req, res, next) {
//  
//      if (req.user) {
//          next()
//      } else {
//          res.redirect('error/404')
//      }
//  }
//  
module.exports = {
    auth,
    
}