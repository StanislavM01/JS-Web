import { useState } from "react"
import { useContext } from "react"
import CarsContext from "../../../contexts/CarsContext"

function SingleCarCard({ car }) {
    let [isEddit, setIsEddit] = useState(false)

    let { changeCarData } = useContext(CarsContext)

    function editCarInfo() {
        setIsEddit(true)
    }

    function onSubmit(e) {
        e.preventDefault()
        let carInfo = Object.fromEntries(new FormData(e.target))
        changeCarData({ img: car.img, brand: car.brand, _id: car._id, ...carInfo })
        setIsEddit(false)
    }

    return (
        <li style={{
            float: 'left'
        }} >
            <img src={car.img} alt='car-image' width={500} />
            <h2>Brand:{car.brand}</h2>

            {!isEddit
                ? <>
                    <div>Model:{car.model}</div>
                    <div>Horse power:{car.hp}</div>
                    <div>Nm:{car.nm}</div>
                    <button onClick={editCarInfo}>Edit</button>
                </>
                : <form onSubmit={onSubmit}>
                    <label htmlFor={`model-${car._id}`}>Model:</label>
                    <input id={`model-${car._id}`} type="text" name="model" defaultValue={car.model} />
                    <label htmlFor={`hp-${car._id}`}>Horse power:</label>
                    <input id={`hp-${car._id}`} type="text" name="hp" defaultValue={car.hp} />
                    <label htmlFor={`nm-${car._id}`} >Nm:</label>
                    <input id={`nm-${car._id}`} type="text" name="nm" defaultValue={car.nm} />
                    <button>Submit</button>
                </form>}
        </li >
    )
}
export default SingleCarCard