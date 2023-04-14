import requester from "../utils/requester"
let baseUrl = 'http://localhost:3030'

async function getAllGames() {
    let allGames = await requester.get(`${baseUrl}/data/games`)
    return allGames
}
async function getOneGame(gameId) {
    let result = await requester.get(`${baseUrl}/data/games/${gameId}`)
    return result
}

async function createOneGame(gameData) {
    try {
        let result = await requester.post('http://localhost:3030/data/games', gameData)
        return result
    }
    catch (err) {
        throw err
    }

}
async function editOneGame(gameId, gameData) {
    let result = await requester.put(`http://localhost:3030/data/games/${gameId}`, gameData)
    return result
}

export default {
    getAllGames,
    getOneGame,
    editOneGame,
    createOneGame
}