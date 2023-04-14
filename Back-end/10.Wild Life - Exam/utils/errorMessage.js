function getErrorMessage(err) {
    
    if (err.errors) {
        let firstErrorPath = Object.keys(err.errors)[0]
        return err.errors[firstErrorPath].message

    } else {
        return err
    }

}

module.exports = getErrorMessage