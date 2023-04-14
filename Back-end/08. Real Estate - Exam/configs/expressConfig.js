let express = require('express')
let path = require('path')
const cookieParser = require('cookie-parser')


function expressConfig(server) {
    server.use('/static', express.static(path.resolve(__dirname, '../static')))
    server.use(express.urlencoded({ extended: true }))
    server.use(cookieParser())
}

module.exports = expressConfig