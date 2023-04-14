let courseService = require('../services/courseService')

async function isOwner(req, res, next) {
    let userId = req.user?._id
    let courseId = req.params.courseId

    let needCourse = await courseService.getOneCourse(courseId)

    if (userId == needCourse.ownerId) {
        next()
    } else {
        res.redirect('/')
    }
}

async function isNotOwner(req, res, next) {
    let userId = req.user?._id
    let courseId = req.params.courseId

    let needCourse = await courseService.getOneCourse(courseId)

    if (userId != needCourse.ownerId) {
        next()
    } else {
        res.redirect('/')
    }
}

async function isNotEnrolled(req, res, next) {
    let userId = req.user?._id
    let courseId = req.params.courseId

    let needCourse = await courseService.getOneCourse(courseId)

    let isEnrolled = needCourse.enrolledUsers.some(a => a == userId)

    if (isEnrolled) {
        res.redirect('/')
    } else {
       next()
    }
}

module.exports = {
    isOwner,
    isNotOwner,
    isNotEnrolled
}