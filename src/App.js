import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect, } from 'react';
import uniqid from 'uniqid'

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Edit from './components/Edit/Edit';
import Details from './components/Details/Details';
import Catalog from './components/Catalog/Catalog';

import gameService from "./services/gameService"


function App() {
  let navigate = useNavigate()

  let [games, setGames] = useState([])
  useEffect(() => {
    gameService.getAllGames()
      .then(result => {
        setGames(result)
      })
  }, [])

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
    let _id = uniqid()
    setGames(oldGames => ([
      ...oldGames,
      { ...gameData, _id }
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
    <div id="box">
      <Header />
      <main id="main-content">
        <Routes>
          <Route path='/' element={<Home games={games} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<Create addGame={addGame} />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/catalog' element={<Catalog games={games} />} />
          <Route path='/catalog/:gameId' element={<Details games={games} addComment={addComment} deleteGame={deleteGame} />} />
          <Route path='/edit/:gameId' element={<Edit games={games} editGame={editGame} deleteGame={deleteGame} />} />
        </Routes>
      </main>
    </div >
  );
}

export default App;
