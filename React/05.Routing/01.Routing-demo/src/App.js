import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import Starship from './components/Starship';
import StarshipList from './components/StarshipList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hello React Routes</h1>

      <Navigation/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/starships' element={<StarshipList />}></Route>
       <Route path='/starships/:starshipId/*' element={<Starship/>}></Route> 
      </Routes>
    </div>
  );
}

export default App;
