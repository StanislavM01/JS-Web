import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import BookList from './components/BookList';
import Timer from './components/Timer';
import Clicker from './components/Clicker';

function App() {
  let books = [
    {
      "author": "Chinua Achebe",
      "country": "Nigeria",
      "language": "English",
      "title": "Things Fall Apart",
      "year": 1958
    },
    {
      "author": "Hans Christian Andersen",
      "country": "Denmark",
      "language": "Danish",
      "title": "Fairy tales",
      "year": 1836
    },
    {
      "author": "Dante Alighieri",
      "country": "Italy",
      "language": "Italian",
      "title": "The Divine Comedy",
      "year": 1315
    }
  ]

  return (
    <div className="App">
      <Header />
      <Clicker/>
      <Timer/>
      <BookList books={books} />
      <Footer >All rights are reserved</Footer >
    </div >
  );
}

export default App;
