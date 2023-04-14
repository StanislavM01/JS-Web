function getErrorMessage(err) {

    if (err.errors) {
        let firstErrorPath = Object.keys(err.errors)[0]
        let errorMessage = err.errors[firstErrorPath].message
        return errorMessage

    } else {
        return err
    }

}

module.exports = getErrorMessage