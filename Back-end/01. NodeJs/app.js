let http = require('http')
let fs = require('fs')
let formidable = require('formidable')
let allBreed = require('./allBreeds.json')

let createServer = http.createServer(function (req, res) {
    console.log(req.url)
    console.log(allBreed.breedsArr)

    if (req.url == '/') {

        fs.readFile('./NodeJs/views/home/index.html', 'utf8', function (err, data) {


            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data)
            res.end()

        })

    } else if (req.url == '/content/styles/site.css') {
        fs.readFile('./NodeJs/content/styles/site.css', 'utf8', function (err, data) {

            res.writeHead(200, {
                'Content-Type': 'text/css'
            })
            res.write(data)
            res.end()
        })

    } else if (req.url == '/content/images/pawprint.ico') {
        fs.readFile('./NodeJs/content/images/pawprint.ico', 'utf8', function (err, data) {

            res.writeHead(200, {
                'Content-Type': 'image/jpeg'
            })
            res.write(data)
            res.end()
        })
    } else if (req.url == '/cats/add-breed' && req.method == 'GET') {
        fs.readFile('./NodeJs/views/addBreed.html', 'utf8', function (err, data) {

            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data)
            res.end()
        })
    } else if (req.url == '/cats/add-breed' && req.method == 'POST') {
        console.log('post method')
        let form = new formidable.IncomingForm()

        form.parse(req, function (err, fields, files) {
            console.log(fields)
           
        })
        res.end()
    }

})
createServer.listen(5000)


