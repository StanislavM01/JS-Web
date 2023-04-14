let mongoose = require('mongoose')
let Person = require('./Model/person')
let Cat = require('./Model/cat')
let Car = require('./Model/car')
let configDb = require('./configDb')


async function nishto() {
    await configDb()

    // await Person.create({
    //     firstName: 'Stoqn',
    //     lastName: 'georgiev',
    //     age:14
    // })

  // await Car.create({
  //     carBrand: 'BMW',
  //     carModel: '3-Series'
  // })

    let getOneDocument = await Car.find()
    console.log(getOneDocument)
    // console.log(getOneDocument.fullName())


}
nishto()



