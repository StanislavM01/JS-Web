import './App.css';
import CarList from './components/carList/CarList';
import CarsContext from './contexts/CarsContext';
import { useEffect, useState } from "react"
import carsService from './services/carsService';

function App() {
  let [carsData, setCarsData] = useState([])

  useEffect(() => {
    carsService.getAllCars()
      .then(allCarsData => {
        setCarsData(Object.values(allCarsData))
      })
  }, [])

  function changeCarData(carInfo) {
    carsService.editOneCar(carInfo)
      .then(carData => {
        setCarsData(oldCarsData => {
          return [
            ...oldCarsData.filter(car => car._id != carData._id),
            carData
          ].sort((a, b) => a._id - b._id)
        })
      })
  }

  return (
    <CarsContext.Provider value={{ carsData, changeCarData }}>
      <div className="App">



        <CarList />
      </div>
    </CarsContext.Provider>
  );
}

export default App;
