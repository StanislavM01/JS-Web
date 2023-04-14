let mongoose = require('mongoose')

let personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: {
        type: Number,
        min:[10,'need to be least 10 years old '],
        required: [true, 'need to add age'],
      
        
    }
})
personSchema.methods.fullName = function () {
    return `full name is ${this.firstName} ${this.lastName}`
}

let Person = mongoose.model('Person', personSchema)

module.exports = Person
