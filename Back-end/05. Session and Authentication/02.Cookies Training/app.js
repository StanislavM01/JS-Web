let express = require('express')
let cookieParser = require('cookie-parser')
let fs = require('fs/promises')
let path = require('path')
let bcrypt = require('bcrypt')

let needPath = path.resolve(__dirname, './views/index.html')

let server = express()

server.use(cookieParser())

server.get('/', function (req, res) {
    console.log('work')
    // res.cookie('test-cookies2', 'some-values2')
    //console.log(req.cookies)

    fs.readFile(path.resolve(__dirname, './views/index.html'), { encoding: 'utf-8' })
        .then((htmlResult) => {
            res.send(htmlResult)

        })


})

server.get('/bcrypt', function (req, res) {
    console.log('work')

    let password = 'safdsfdsa'
    let saltRounds = 9
    bcrypt.genSalt(saltRounds)
        .then((salt) => {
            return bcrypt.hash(password, salt)
        })
        .then((hashPassword) => {
            console.log(hashPassword)
            res.send(hashPassword)

        })

})


server.get('/bcrypt/verify/:password', function (req, res) {
    console.log('work')
    let hash = '$2b$09$li1Km.fqgcA5PWgkh3rqTuunwFQHC7GIUB2MkORydKvvl0F28hPA2'
    let password = req.params.password

    bcrypt.compare(password,hash)
    .then(data =>{
        console.log(data)
        res.send(data)
    })
})


server.listen(5000)