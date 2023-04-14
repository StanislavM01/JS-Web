let express = require('express')
let route = express.Router()
let path = require('path')

route.get('/gosho', function (req, res) {
    let fullPath = path.resolve(__dirname, '../content/images/cat1.jpg')

    res.sendFile(fullPath)

})

route.get('/:catName', function (req, res) {
    let fullPath = path.resolve(__dirname, '../content/images/cat2.jpg')

    console.log(__dirname)
    console.log(fullPath)

    res.sendFile(fullPath)

})

module.exports = route