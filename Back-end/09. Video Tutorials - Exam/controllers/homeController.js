let express = require('express')
let route = express.Router()

let courseService = require('../services/courseService')
let { isLogged } = require('../middlawares/authMiddlaware')

route.get('/', async function (req, res) {
    let allCourses = await courseService.getAllCourses()
    let userId = req.user?._id
    let courses = allCourses.filter(a => a.isPublic == true || a.ownerId == userId)
    console.log(courses)

    console.log(allCourses)
    res.render('home', { courses })
})

route.get('/myProfile', isLogged,async function (req, res) {
    let userId = req.user._id
    let coursesOnUser = await courseService.getAllEnrolledCoursesOnUser(userId)

    let allTitles = coursesOnUser.map(a => a.title)
    allTitles = allTitles.join(', ')

    res.render('myProfile', { allTitles })

})

module.exports = route