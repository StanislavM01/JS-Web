let express = require('express')
let server = express()

let { PORT } = require('./constants')
let routes = require('./routes')
let databaseConnect = require('./configs/mongooseConfig')
let authMiddlaware = require('./middlawares/authMiddlaware')

require('./configs/expressConfig')(server)
require('./configs/hbsConfig')(server)

server.use(authMiddlaware.auth)
server.use(routes)


databaseConnect()
    .then(() => {
        server.listen(PORT, () => { console.log('the server is starting') })
    })
    .catch((err) => {
        console.log('have problem with connection to database', err)
    })





