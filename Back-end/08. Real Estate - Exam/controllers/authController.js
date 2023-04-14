let express = require('express')
let route = express.Router()
let authService = require('../services/authService')
let { COOKIE_NAME } = require('../constants')
let getErrorMessage = require('../utils/errors')
let { isGuest, isAuth } = require('../middlawares/authMiddlaware')

route.get('/register', isGuest, function (req, res) {
    res.render('auth/register')
})

route.post('/register', isGuest, async function (req, res) {

    let { name, username, password, repeatPassword } = req.body

    try {
        if (password !== repeatPassword) {
           throw new Error('password dont match')
        }

        await authService.register({
            name,
            username,
            password
        })

        let token = await authService.login({ username, password })
        res.cookie(COOKIE_NAME, token)

        res.redirect('/')

    }
    catch (err) {
        let errorMessage = getErrorMessage(err)
        res.render('auth/register',{error:errorMessage})
    }




})


route.get('/login', isGuest, function (req, res) {
    res.render('auth/login')
})

route.post('/login', isGuest, async function (req, res) {
    let { username, password } = req.body

    try {
        let token = await authService.login({ username, password })
        res.cookie(COOKIE_NAME, token)
        res.redirect('/')

    } catch (err) {
        let errorMessage = getErrorMessage(err)
        res.render('auth/login',{error:errorMessage})
    }



})

route.get('/logout', isAuth, function (req, res) {
    res.clearCookie(COOKIE_NAME)
    res.redirect('/')
})

module.exports = route