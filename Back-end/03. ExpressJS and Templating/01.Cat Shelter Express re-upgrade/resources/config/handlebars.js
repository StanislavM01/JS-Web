let handlebars = require('express-handlebars')
let path = require('path')

function configHandlebars(server) {

    server.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }));
    server.set('view engine', 'hbs')
    server.set('views', path.resolve(__dirname,'../views'))
}

module.exports = configHandlebars