let { PORT } = require('./constants')
let configHandlebars = require('./config/handlebarsConfig')
let expressConfig = require('./config/expressConfig')
let databaseConnect = require('./config/mongooseConfig')
let routes = require('./routes')
let { auth } = require('./middlawares/authMiddlaware')

let express = require('express')
let server = express()

expressConfig(server)
configHandlebars(server)

server.use(auth)
server.use(routes)





databaseConnect()
    .then(() => {
        server.listen(PORT, () => console.log('connect to database'))
    })
    .catch(() => {
        console.log('connection problem with database')
    })

