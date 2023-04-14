import SingleGameCard from "./SingleGameCard-Catalog/SingleGameCard"

function Catalog({ games }) {

    return (

        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0 ? games.map(a => <SingleGameCard key={a._id} game={a} />) : ''}
            <h3 className="no-articles">No articles yet</h3>
        </section>
    )
}

export default Catalog