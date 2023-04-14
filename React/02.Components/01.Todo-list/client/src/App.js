import Header from './components/Header';
//import LoadingContainer from './components/Loading';
import ToDoList from './components/ToDoWholeList';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">

      <Header />

      <main className="main">

        <section className="todo-list-container">
          <h1>Todo List</h1>

          <div className="add-btn-container">
            <button className="btn">+ Add new Todo</button>
          </div>

          <ToDoList />

        </section>
      </main>

      <Footer />

    </div>
  );
}

export default App;
