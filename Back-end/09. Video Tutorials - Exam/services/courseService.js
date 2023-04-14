let Course = require('../models/Course')

function createCourse(courseInfo) {
    return Course.create(courseInfo)
}

function getAllCourses() {
    return Course.find({}).lean()
}

function getOneCourse(courseId) {
    return Course.findById(courseId).lean()
}

async function enrollInCourse(courseId,userId) {
    let course = await Course.findById(courseId)
    course.enrolledUsers.push(userId)
    await course.save()
}

function editCourse(courseId,courseData) {
    return Course.findByIdAndUpdate(courseId,courseData)
}

function deleteCourse(courseId) {
    return Course.findByIdAndDelete(courseId)
}

function getAllEnrolledCoursesOnUser(userId) {
    return Course.find({enrolledUsers:userId}).lean()
}



module.exports = {
    createCourse,
    getAllCourses,
    getOneCourse,
    enrollInCourse,
    deleteCourse,
    editCourse,
    getAllEnrolledCoursesOnUser
}