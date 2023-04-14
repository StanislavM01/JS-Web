import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Film() {
    let [filmData, setFilmData] = useState({})
    let { filmId } = useParams()

    useEffect(() => {
        (async function () {
            let response = await fetch(`https://swapi.dev/api/films/${filmId}/`)
            let filmData = await response.json()
            setFilmData(oldData => filmData)
        })()
    }, [filmId])

    return (
        <>
            <h4>Title: {filmData.title}</h4>
        </>
    )
}

export default Film