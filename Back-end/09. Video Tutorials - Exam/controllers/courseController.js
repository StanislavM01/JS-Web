let express = require('express')
let route = express.Router()

let getErrorMessage = require('../utils/errorMessage')
let courseService = require('../services/courseService')
let { isOwner,isNotOwner,isNotEnrolled } = require('../middlawares/courseMiddlaware')
let { isLogged } = require('../middlawares/authMiddlaware')


route.get('/create', isLogged,function (req, res) {
    res.render('course/create')
})

route.post('/create',isLogged, async function (req, res) {
    let courseInfo = req.body
    let userId = req.user._id
    
    if (courseInfo.isPublic) {
        courseInfo.isPublic = true
    }


    try {
        await courseService.createCourse({ ...courseInfo, ownerId: userId })
        res.redirect('/')

    } catch (err) {
        let errorMessage = getErrorMessage(err)
        res.render('course/create', { error: errorMessage, ...courseInfo })
    }

})

route.get('/:courseId/details', async function (req, res) {
    let courseId = req.params.courseId
    let needCourse = await courseService.getOneCourse(courseId)
    let userId = req.user?._id
    let isOwner = needCourse.ownerId == userId
    let isEnrolledInCourse = needCourse.enrolledUsers.some(a => a == userId)

    res.render('course/details', { ...needCourse, isOwner, isEnrolledInCourse })
})

route.get('/:courseId/enroll',isLogged,isNotOwner,isNotEnrolled, async function (req, res) {
    let courseId = req.params.courseId
    let userId = req.user._id
    await courseService.enrollInCourse(courseId, userId)
    res.redirect(`/course/${courseId}/details`)
})

route.get('/:courseId/edit',isOwner, async function (req, res) {
    let courseId = req.params.courseId
    let needCourse = await courseService.getOneCourse(courseId)

    res.render('course/edit', { ...needCourse })
})

route.post('/:courseId/edit',isOwner, async function (req, res) {
    let courseId = req.params.courseId
    let courseData = req.body
    
    if (courseData.isPublic) {
        courseData.isPublic = true
    }

    await courseService.editCourse(courseId, courseData)

    res.redirect(`/course/${courseId}/details`)
})

route.get('/:courseId/delete',isOwner, async function (req, res) {
    let courseId = req.params.courseId
    await courseService.deleteCourse(courseId)
    res.redirect('/')
})

module.exports = route 