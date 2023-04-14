let express = require('express')
let path = require('path')
let cookieParaser = require('cookie-parser')

function expressConfig(server) {
    server.use(express.urlencoded({ extended: true }))
    server.use('/static', express.static(path.resolve(__dirname, '../static')))
    server.use(cookieParaser())

}

module.exports = expressConfig