import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function StarshipList() {

    let [starships, setStarships] = useState([])

    useEffect(() => {
        (async function () {
            let response = await fetch('https://swapi.dev/api/starships')
            let result = await response.json()
            setStarships(oldData => result.results)
        })()
    }, [])

    return (
        <ul>

            {starships.map((a, i) => <li key={i} ><Link to={a.url.split('/')[5]}>{a.name}</Link></li>)}

        </ul>
    )
}

export default StarshipList
