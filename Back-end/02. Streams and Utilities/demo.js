const eventBus = require('./eventBus.js')

eventBus.subscribe('im-here', function (town, firstName) {
    console.log('yee im here', town, firstName)
})





eventBus.publish('im-here','Burgas','Stanislav')
