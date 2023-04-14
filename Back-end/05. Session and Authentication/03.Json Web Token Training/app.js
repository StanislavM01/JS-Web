let express = require('express')
let fs = require('fs/promises')
let path = require('path')
let jwt = require('jsonwebtoken')
let uniqId = require('uniqid')
let cookieParser = require('cookie-parser')

let server = express()

let pathToHtml = path.resolve(__dirname, './views/index.html')

server.use(cookieParser())

let SECRET = 'mysecret'

server.get('/', function (req, res) {
    console.log('work')
    // res.cookie('test-cookies2', 'some-values2')
    //console.log(req.cookies)
    fs.readFile(path.resolve(__dirname, './views/index.html'), { encoding: 'utf-8' })
        .then((htmlResult) => {
            res.send(htmlResult)

        })

})

server.get('/token/create/:password', function (req, res) {

    let paylaod = {
        password: req.params.password,
        id: uniqId()
    }
    let secret = 'mysecret'
    let options = {
        expiresIn: '1d'
    }

    let token = jwt.sign(paylaod, secret, options)
    res.cookie('jwt', token)
    res.send('token is generated')
    console.log(token)
})

server.get('/token/verify', function (req, res) {

    let token = req.cookies.jwt
    console.log(token)

    jwt.verify(token, SECRET, (err, paylaod) => {
        if (err) {
            res.status(400)
        }

        res.json(paylaod)
    })
})



server.listen(5000)