import requester from "../utils/requester";

let baseUrl = 'http://localhost:3030'

async function login(userData) {
    return await requester.post(`${baseUrl}/users/login`, userData)
}
async function logout(accessToken) {
    let response = await fetch(`${baseUrl}/users/logout`, {
        method: 'GET',
        headers: {
            'X-Authorization': accessToken
        }
    })
    return response
}
async function register({ email, password }) {

    return await requester.post(`${baseUrl}/users/register`, { email, password })
    
}

export default {
    login,
    register,
    logout
}