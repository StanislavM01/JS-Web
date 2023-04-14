async function getAllCars() {
    let response = await fetch('http://localhost:3030/jsonstore/cars')
    let result = await response.json()
    return result
}

async function editOneCar(carData) {
    let response = await fetch(`http://localhost:3030/jsonstore/cars/${carData._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(carData)
    })
    let result = await response.json()
    return result
}


export default {
    getAllCars,
    editOneCar
}