import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect, } from 'react';


import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Edit from './components/Edit/Edit';
import Details from './components/Details/Details';
import Catalog from './components/Catalog/Catalog';
import Logout from './components/Logout/Logout';

import gameService from "./services/gameService"
import UserContext from './contexts/UserContext'
import GameContext from './contexts/GameContext';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  let navigate = useNavigate()
  let [userInfo, setUserInfo] = useLocalStorage({})
  let [games, setGames] = useState([])


  useEffect(() => {
    gameService.getAllGames()
      .then(result => {
        setGames(result)
      })
  }, [])

  function userLogin(userData) {
    setUserInfo(userData)
  }

  function userLogout() {
    setUserInfo({})
  }

  function addComment(game, { username, comment }) {

    let comments = game.comments || []
    comments.push({ username, comment })
    setGames(oldGames => {
      return [
        ...oldGames.filter(a => a._id !== game._id),
        { ...game, comments }
      ]
    })
  }

  function addGame(gameData) {
    setGames(oldGames => ([
      ...oldGames,
      { ...gameData }
    ]))
  }

  function editGame(gameData) {
    setGames(oldGames => ([
      ...oldGames.filter(a => a._id !== gameData._id),
      gameData
    ]))
    navigate(`/catalog/${gameData._id}`)
  }

  function deleteGame(gameId) {
    setGames(oldGames => ([
      ...oldGames.filter(a => a._id !== gameId),
    ]))
    navigate(`/catalog`)
  }




  return (
    <UserContext.Provider value={{ userLogin, userLogout, userInfo }}>
      <div id="box">
        <Header />
        <main id="main-content">
          <GameContext.Provider value={{ addGame, games, addComment, deleteGame,editGame }}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/create' element={<Create />} />
              {/* <Route path='/edit' element={<Edit />} /> */}
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/catalog/:gameId' element={<Details />} />
              <Route path='/edit/:gameId' element={<Edit />} />
              <Route path='/logout' element={<Logout />} />

            </Routes>
          </GameContext.Provider>
        </main>
      </div >
    </UserContext.Provider>
  );
}

export default App;
