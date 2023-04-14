let express = require('express')
let route = express.Router()

let jwt = require('../utils/jwt')
let authService = require('../services/authService')
let getErrorMessage = require('../utils/errorMessage')
let { COOKIE_NAME } = require('../constants')
let { isGuest, isLogged } = require('../middlawares/authMiddlaware')

route.get('/register', isGuest, function (req, res) {
    res.render('auth/register')
});


route.post('/register', isGuest, async function (req, res) {

    let { firstName, lastName, email, password, repeatPassword } = req.body
    console.log(req.body)

    try {
        if (password != repeatPassword) {
            throw new Error('password and repeat password dont match')
        }
        let user = await authService.register({ firstName, lastName, email, password })
        let jsonWebToken = await jwt.sign({ email, _id: user._id })

        res.cookie(COOKIE_NAME, jsonWebToken)
        res.redirect('/')
    } catch (err) {
        let errorMessage = getErrorMessage(err)
        res.render('auth/register', { error: errorMessage })
    }

})


route.get('/login', isGuest, function (req, res) {
    res.render('auth/login')
})

route.post('/login', isGuest, async function (req, res) {

    let { email, password } = req.body

    try {

        let jsonWebToken = await authService.login({ email, password })

        res.cookie(COOKIE_NAME, jsonWebToken)
        res.redirect('/')



    } catch (err) {
        let errorMessage = getErrorMessage(err)
        console.log(errorMessage)
        res.render('auth/login', { error: errorMessage })
    }


})

route.get('/logout',isLogged,function(req,res){
    res.clearCookie(COOKIE_NAME)
    res.redirect('/')
})
module.exports = route