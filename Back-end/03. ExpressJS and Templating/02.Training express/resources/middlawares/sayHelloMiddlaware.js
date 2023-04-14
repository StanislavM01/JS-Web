function sayHello(req, res, next) {

    console.log('hello on all cat')
    console.log(req.path)
    next()
}

module.exports = sayHello