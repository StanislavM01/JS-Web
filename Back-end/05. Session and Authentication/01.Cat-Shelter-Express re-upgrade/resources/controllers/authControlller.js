let express = require('express')
let route = express.Router()
let authService = require('../services/authService')
let jsonWebService = require('../services/jsonWebService')

route.get('/login', function (req, res) {
    res.render('auth/login')
})
route.post('/login', async function (req, res) {

    let { username, password } = req.body

    try {

        let result = await authService.login(username, password)
        if (result) {
            let userId = await authService.getUserId(username)
            let token = await jsonWebService.createJsonWebToken({ username, userId })

            res.cookie('jsonWebToken', token, {
                httpOnly: true
            })


            console.log(token)

            res.redirect('/')
        } else {
            console.log('aaa')
        }


    }
    catch (err) {
        res.status(400).send(err)
    }

})

route.get('/register', function (req, res) {
    res.render('auth/register')

})

route.post('/register', async function (req, res) {
    let { username, password, repeatPassword } = req.body


    try {
        if (password != repeatPassword) {
            throw new Error('password and repeat password dont match')
        }
        await authService.register(username, password)
        res.redirect('/auth/login')

    }
    catch (err) {
        console.log(err.message)
        res.render('auth/register', { error: err.message })
    }

})

route.get('/logout', function (req, res) {
    res.clearCookie('jsonWebToken')
    res.redirect('/')
})


module.exports = route