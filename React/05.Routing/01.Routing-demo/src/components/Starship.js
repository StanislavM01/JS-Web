import { useEffect, useState } from 'react'
import { Routes, Route, useParams, Link, useNavigate } from 'react-router-dom'
import Film from './Film'

function Starship() {
    let navigate = useNavigate()
    let params = useParams()
    let { starshipId } = params

    let [product, setProduct] = useState({})
    useEffect(() => {
        (async function () {
            let response = await fetch(`https://swapi.dev/api/starships/${starshipId}/`)
            let data = await response.json()
            setProduct(oldData => data)
        })()
    }, [starshipId])

    function navigation(currentFilm) {
        //console.log(`film/${currentFilm.split('/')[5]}`)
        navigate(`film/${currentFilm.split('/')[5]}`, { replace: true })
    }

    return (
        <div>
            <h3>Name: {product.name}</h3>
            <ul>
                <li>Consumables: {product.consumables}</li>
                <li>Model: {product.model}</li>
                <li>Starship class: {product.starship_class}</li>
            </ul>

            <h3>Movies</h3>

            <ul>
                {product.films?.map((a, i) => <li key={i}><button onClick={() => navigation(a)}>{`Film ${a.split('/')[5]}`}</button></li>)}
                {/* {product.films?.map((a, i) => <li key={i}><Link to={`film/${a.split('/')[5]}`}>{`Film ${a.split('/')[5]}`}</Link></li>)} */}
            </ul>
            <Routes>-
                <Route path={'film/:filmId'} element={<Film />}></Route>
            </Routes>

        </div>
    )
}

export default Starship