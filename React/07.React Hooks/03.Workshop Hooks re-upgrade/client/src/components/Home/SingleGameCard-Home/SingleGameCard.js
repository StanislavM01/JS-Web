function SingleGameCard({ game }) {
    return (
        <div className="game">
            <div className="image-wrap">
                <img src={game.imageUrl} />
            </div>
            <h3>{game.title}</h3>
            <div className="rating">
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
                <span>☆</span>
            </div>
            <div className="data-buttons">
                <a href={`/catalog/${game._id}`} className="btn details-btn">Details</a>
            </div>
        </div>
    )
}

export default SingleGameCard