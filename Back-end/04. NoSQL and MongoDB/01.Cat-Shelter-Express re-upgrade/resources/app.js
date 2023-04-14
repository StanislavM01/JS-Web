let express = require('express')
let server = express()
let path = require('path')
let connectToDatabase = require('./config/database')



let configHandlebars = require('./config/handlebars')
let routes = require('./routes')

configHandlebars(server)

server.use(express.urlencoded({ extended: true }))
server.use(express.json())


let staticPath = path.resolve(__dirname, 'content')
server.use('/content', express.static(staticPath))
server.use(routes)

connectToDatabase()
    .then(() => {
        console.log('Connected to Database')
        server.listen(5000)
    })
