let express = require('express')
let route = express.Router()

let jwt = require('../tools/jwt')
let userService = require('../services/userService')

route.post('/login', async function (req, res) {
    let { email, password } = req.body
    try {

        let result = await userService.login({ email, password })
        let jsonWebToken = await jwt.sign({ _id: result._id, email })

        
        res.json({
            email,
            accessToken: jsonWebToken,
            _id: result._id
        })

    } catch (err) {

        res.json({
            err
        })
    }


})

route.post('/register', async function (req, res) {
    console.log('aaa')
    let { email, password } = req.body
    try {

        let result = await userService.register({ email, password })
        let jsonWebToken = await jwt.sign({ _id: result._id, email })
        res.json({
            email,
            accessToken: jsonWebToken,
            _id: result._id
        })

    } catch (err) {
        res.json({
            err
        })

    }


})


route.get('/logout', async function (req, res) {

    res.json({ ok: true })
})
module.exports = route