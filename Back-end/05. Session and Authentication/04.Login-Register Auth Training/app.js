let express = require('express')
let path = require('path')
let jwt = require('jsonwebtoken')
let uniqId = require('uniqid')
let cookieParser = require('cookie-parser')
let handlebars = require('express-handlebars')

let authService = require('./services/authService')
let authMiddlaware = require('./middlaware/authMiddlaware')

let server = express()
server.use(cookieParser())
server.use(express.urlencoded({ extended: true }))
server.engine('hbs', handlebars.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', path.resolve(__dirname, './views'))
server.use(authMiddlaware.auth)

let SECRET = 'gdsjkndosg390gwes9img4e!@#xcsdc'





server.get('/register', function (req, res) {
    res.render('register')
})

server.post('/register', async function (req, res) {

    let { username, password } = req.body

    try {
        await authService.register(username, password)
        console.log('your is register')
        res.redirect('/login')

    }
    catch (err) {
        res.status(400).send(err)
    }



})


server.get('/login', function (req, res) {
    res.render('login')
})

server.post('/login', async function (req, res) {
    let { username, password } = req.body



    try {
        let isValid = await authService.login(username, password)

        if (isValid) {
            jwt.sign({ username }, SECRET, { expiresIn: '1d' }, (err, token) => {
                if (err) {
                    res.status(400).send('problem with json web token')
                } else {
                    res.cookie('jwt', token)
                    console.log('your are login')
                    res.redirect('/')
                }
            })
        } else {
            res.status(400).send('compare on password is invalid')
        }
    }
    catch (err) {
        res.status(400)
        res.send('aaa')
    }


})

server.get('/profile', function (req, res) {
    let userInfo = req.userInfo
    console.log(userInfo)
    res.render('profile', userInfo)
})

server.listen(5000) 