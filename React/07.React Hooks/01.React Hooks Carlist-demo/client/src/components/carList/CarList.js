import SingleCarCard from "./SingleCarCard/SingleCarCard"
import CarsContext from "../../contexts/CarsContext"
import { useContext } from "react"

function CarList() {
    let { carsData } = useContext(CarsContext)
    return (
        <ul>
            {
                carsData.map(car => <SingleCarCard key={car._id} car={car} />)
            }
        </ul>
    )
}

export default CarList