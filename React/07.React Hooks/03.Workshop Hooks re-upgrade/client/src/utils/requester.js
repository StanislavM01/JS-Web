async function request(method, url, data) {

    let authorized = {}
    let auth = localStorage.getItem('auth')
    if (auth) {
        let accessToken = JSON.parse(auth).accessToken
        authorized['X-Authorization'] = accessToken
    }



    try {
        let fetchRequest
        if (method === 'GET') {
            fetchRequest = fetch(url, {
                headers: {
                    ...authorized
                }
            })
        } else {
            fetchRequest = fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...authorized
                },
                body: JSON.stringify(data)
            })
        }

        let response = await fetchRequest

        if (response.ok) {
            let result = await response.json()
            return result
        } else {
            let error = await response.json()
            throw error
        }

    } catch (err) {
        throw err
    }

}

let get = request.bind({}, 'GET')
let post = request.bind({}, 'POST')
let put = request.bind({}, 'PUT')

export default {
    get, post, put
}