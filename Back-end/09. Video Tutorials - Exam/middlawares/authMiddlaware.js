let { COOKIE_NAME } = require('../constants')
let { JSON_SECRET_KEY } = require('../constants')
let jwt = require('../utils/jwt')

async function auth(req, res, next) {
    let token = req.cookies[COOKIE_NAME]

    try {
        if (token) {
            let userInfo = await jwt.verify(token)
            req.user = userInfo
            res.locals.user = userInfo
            next()

        } else {
            next()
        }

    } catch (err) {
        console.log(err)
        res.clearCookie(COOKIE_NAME)
        res.redirect('/auth/login')
    } 




}
function isGuest(req,res,next){

    if(!req.user){
        next()
    }else{
        res.redirect('/')
    }
}

function isLogged(req,res,next){

    if(req.user){
        next()
    }else{
        res.redirect('/')
    }
}

module.exports = {
    auth,
    isGuest,
    isLogged
}