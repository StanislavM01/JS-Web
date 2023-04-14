let express = require('express')
let route = express.Router()

let { COOKIE_NAME } = require('../constants')
let getErrorMessage = require('../utils/errorMessage')
let authService = require('../services/authService')
let jwt = require('../utils/jwt')
let { isGuest ,isLogged} = require('../middlawares/authMiddlaware')

route.get('/register', isGuest,function (req, res) {
    res.render('auth/register')
});

route.post('/register',isGuest, async function (req, res) {

    let { username, password, repeatPassword } = req.body
    console.log(req.body)

    try {
        if (password != repeatPassword) {
            throw new Error('password and repeat password dont match')
        }

        let user = await authService.register({ username, password })

        let jsonWebToken = await jwt.sign({ username, _id: user._id })

        res.cookie(COOKIE_NAME, jsonWebToken)
        res.redirect('/')


    } catch (err) {
        let errorMessage = getErrorMessage(err)
        res.render('auth/register', { error: errorMessage, username, password, repeatPassword })
    }
})

route.get('/login',isGuest, function (req, res) {
    res.render('auth/login')
})

route.post('/login',isGuest, async function (req, res) {

    let { username, password } = req.body

    try {

        let jsonWebToken = await authService.login({ username, password })

        res.cookie(COOKIE_NAME, jsonWebToken)
        res.redirect('/')



    } catch (err) {
        let errorMessage = getErrorMessage(err)
        res.render('auth/login', { error: errorMessage, username, password })
    }


})


route.get('/logout', isLogged,function (req, res) {
    res.clearCookie(COOKIE_NAME)
    res.redirect('/')
})


module.exports = route