async function getAllUsers() {
    let response = await fetch('http://localhost:3005/api/users')
    let result = await response.json()
    return result.users
}

async function getOneUser(userId) {
    let response = await fetch(`http://localhost:3005/api/users/${userId}`)
    let result = await response.json()

    return result.user
}

async function createOneUser(userData) {
    let response = await fetch(`http://localhost:3005/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    let result = await response.json()

    return result.user
}

async function editOneUser({ userId, userData }) {
    let response = await fetch(`http://localhost:3005/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    let result = await response.json()

    return result.user
}

async function deleteOneUser(userId) {
    let response = await fetch(`http://localhost:3005/api/users/${userId}`, { method: 'DELETE' })
    let result = await response.json()

    return result
}
export default {
    getAllUsers,
    getOneUser,
    createOneUser,
    editOneUser,
    deleteOneUser
}