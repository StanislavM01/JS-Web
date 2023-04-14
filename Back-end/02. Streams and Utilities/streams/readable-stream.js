let fs = require('fs')

let readableStream = fs.createReadStream('streams/streamTemplate.html', {
    encoding: 'utf-8',
    highWaterMark: 1024
})

readableStream.on('data', function (chunk) {
    console.log('START CHUNK')
    console.log('START CHUNK')
    console.log('START CHUNK')
    console.log('START CHUNK')

    console.log(chunk)

})
