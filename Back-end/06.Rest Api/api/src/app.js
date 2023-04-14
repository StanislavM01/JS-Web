const express = require("express");
let mongoose = require('mongoose')
let routes = require('./routes')
let { auth } = require('./middlawares/authMiddlaware')

let server = express()

mongoose.set('strictQuery', true)

mongoose.connect('mongodb://127.0.0.1/restApiDataStorage')
    .then(() => {
        server.listen(3030, () => console.log('server is starting'))
    })

server.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATH,OPTIONS')

    next()
})
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(auth)
server.use(routes)


server.get('/', function (req, res) {
    res.json({ firstName: 'gosho' })
})

