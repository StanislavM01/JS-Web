let express = require('express')
let path = require('path')
let handlebars = require('express-hnadlebars')

let catController = require('./controllers/catControllers')
let sayHelloMiddlaware = require('./middlawares/sayHelloMiddlaware')


let server = express()

let staticPath = path.resolve(__dirname, './public')

server.use('/static', express.static(staticPath))
server.use('/cats', sayHelloMiddlaware, catController)

server.get('/', function (req, res) {
    res.write('this is main page')
    res.end()
})

server.get('/addBreed', function (req, res) {

    res.write('addBreed Page')
    res.end()
})
server.get('/add*', function (req, res) {

    res.write('add something else')
    res.end()
})



server.listen(5000)