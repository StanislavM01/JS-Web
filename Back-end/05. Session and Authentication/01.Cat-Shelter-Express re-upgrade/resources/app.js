let express = require('express')
let server = express()
let path = require('path')
let cookieParser = require('cookie-parser')
let connectToDatabase = require('./config/database')
let mongoose = require('mongoose')

mongoose.set('strictQuery', true)



let configHandlebars = require('./config/handlebars')
let routes = require('./routes')

configHandlebars(server)

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cookieParser())


let staticPath = path.resolve(__dirname, 'content')
server.use('/content', express.static(staticPath))
server.use(routes)

connectToDatabase()
    .then(() => {
        console.log('Connected to Database')
        server.listen(5000)
    })
