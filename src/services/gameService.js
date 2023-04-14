let baseUrl = ' http://localhost:3030'
async function getAllGames() {
    let response = await fetch(`${baseUrl}/data/games`)
    let allGames = await response.json()
    return allGames
}


export default {
    getAllGames
}