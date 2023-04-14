import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Details({ games, addComment, deleteGame }) {
    let { gameId } = useParams()
    let game = games.find(a => a._id === gameId)
    let [comment, setComment] = useState({
        username: '',
        comment: ''
    })
    let [errors, setErrors] = useState({
        username: '',
        comment: ''
    })

    console.log(games)

    function changeHandler(e) {
        setComment(oldComment => ({
            ...oldComment,
            [e.target.name]: e.target.value
        }))
    }

    function submitHandler(e) {
        e.preventDefault()
        addComment(game, comment)
    }

    function usernameValidator(e) {
        let username = e.target.value
        let errorMessage = ''

        if (username.length <= 3) {
            errorMessage = 'username must be more than 3 characters'
        }
        if (username.length >= 12) {
            errorMessage = 'username must be lower than 12 characters'
        }

        setErrors(oldData => ({
            ...oldData,
            username: errorMessage
        }))
    }

    function commentValidator(e) {
        let comment = e.target.value
        let errorMessage = ''

        if (comment.length <= 6) {
            errorMessage = 'comment must be more than 6 characters'
        }
        if (comment.length >= 60) {
            errorMessage = 'comment must be lower than 60 characters'
        }

        setErrors(oldData => ({
            ...oldData,
            comment: errorMessage
        }))
    }


    return (

        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game?.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">
                    {game?.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* list all comments for current game (If any) */}

                        {game.comments
                            && game.comments.map((a, i) =>
                                <li className="comment" key={i}>
                                    <p>{a.username}: {a.comment}</p>
                                </li>)
                        }
                    </ul>
                    {/* Display paragraph: If there are no games in the database */}
                    {!game.comments &&
                        <p className="no-comment">No comments.</p>
                    }
                </div>

                {/* Edit/Delete buttons ( Only for creator of this game )  */}
                <div className="buttons">
                    <Link to={`/edit/${game._id}`} className="button">Edit</Link>
                    <button className="button" onClick={() => deleteGame(gameId)}>Delete</button>
                </div>
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={submitHandler}>
                    <input name='username' type='text' placeholder='John Wick' onChange={changeHandler} onBlur={usernameValidator}></input>
                    {errors.username &&
                        <div>{errors.username}</div>
                    }
                    <textarea name="comment" placeholder="Comment......" defaultValue={""} onChange={changeHandler} onBlur={commentValidator} />
                    {errors.comment &&
                        <div>{errors.comment}</div>
                    }
                    <input className="btn submit" type="submit" defaultValue="Add Comment" />
                </form>
            </article>
        </section>
    )
}

export default Details