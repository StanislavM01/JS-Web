let express = require('express')
let route = express.Router()

let catServices = require('../services/catServices')

route.get('/', async function (req, res) {
    let allCats = await catServices.getAllCats()

    if(req.user){
        allCats.forEach(a => {
            if (a.ownerId == req.user.userId) {
                a.isOwner = true
            }
        })
    }
   
    res.render('index', { allCats })
})

module.exports = route