function Create({addGame}) {

    function submitHandler(e) {
        e.preventDefault()
        let gameData = Object.fromEntries(new FormData(e.target))
        addGame(gameData)

    }

    return (
        < section id="create-page" className="auth" >
            <form id="create" onSubmit={submitHandler}>
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="titleOne" name="title" placeholder="Enter game title..." />
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="categoryOne" name="category" placeholder="Enter game category..." />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevelOne" name="maxLevel" min={1} placeholder={1} />
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrlOne" name="imageUrl" placeholder="Upload a photo..." />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summaryOne" defaultValue={""} />
                    <input className="btn submit" type="submit" defaultValue="Create Game" />
                </div>
            </form>
        </section >
    )
}
export default Create