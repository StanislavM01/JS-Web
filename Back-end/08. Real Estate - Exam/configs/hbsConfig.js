let handlebars = require('express-handlebars')
let path = require('path')

function configHbs(server) {

    
    server.engine('hbs', handlebars.engine({
        extname: 'hbs'
    }))
    server.set('views', path.resolve(__dirname, '../views'))
    server.set('view engine', 'hbs')

}

module.exports = configHbs