import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import gameService from "../../services/gameService"
import GameContext from "../../contexts/GameContext"

function Edit() {
    let { editGame } = useContext(GameContext)
    let { gameId } = useParams()

    let [gameData, setGameData] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    })


    useEffect(() => {
        gameService.getOneGame(gameId)
            .then(game => {
                setGameData(game)
            })
    }, [])

    function onChangeHandler(e) {

        setGameData(oldData => ({
            ...oldData,
            [e.target.name]: e.target.value
        }))

    }

    function submitHandler(e) {
        e.preventDefault()
        gameService.editOneGame(gameId,gameData)
            .then(gameData => {
                editGame(gameData)
            })
    }
    return (

        < section id="edit-page" className="auth" >
            <form id="edit" onSubmit={submitHandler}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="titleTwo" name="title" value={gameData.title} onChange={onChangeHandler} />
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="categoryTwo" name="category" value={gameData.category} onChange={onChangeHandler} />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevelTwo" name="maxLevel" min={1} value={gameData.maxLevel} onChange={onChangeHandler} />
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrlTwo" name="imageUrl" value={gameData.imageUrl} onChange={onChangeHandler} />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summaryTwo" value={gameData.summary} onChange={onChangeHandler} />
                    <input className="btn submit" type="submit" defaultValue="Edit Game" />
                </div>
            </form>
        </section >
    )
}
export default Edit