import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    age: '',
    description: 'abv',
    gender: 'Female',
    tac: false
  })

  function userDataHandler(e) {
    let targetType = e.target.type
    let targetName = e.target.name
    let targetValue = e.target.value

    console.log(targetType)
    setUserData(oldData => {
      return {
        ...oldData,
        [targetName]: targetType == 'checkbox' ? e.target.checked : targetValue
      }
    })
  }

  console.log(userData)
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <div>
            <label htmlFor="firstName">First name: </label>
            <input type="text" id='firstName' name='firstName' onChange={userDataHandler} value={userData.firstName} />
          </div>
          <div>
            <label htmlFor="lastName">Last name: </label>
            <input type="text" id='lastName' name='lastName' onChange={userDataHandler} value={userData.lastName} />
          </div>
          <div>
            <label htmlFor="passowrd">Password: </label>
            <input type="password" id='password' name='password' onChange={userDataHandler} value={userData.password} />
          </div>
          <div>
            <label htmlFor="age">age: </label>
            <input type="number" id='age' name='age' onChange={userDataHandler} value={userData.age} />
          </div>
          <div>
            <label htmlFor="textArea">description: </label>
            <textarea name="description" id="textArea" cols="30" rows="5" value={userData.description} onChange={userDataHandler} />
          </div>
          <div>
            <label htmlFor="male">Male </label>
            <input type="radio" id='male' name='gender' value='Male' checked={userData.gender == 'Male'} onChange={userDataHandler} />
            <label htmlFor="female">Female </label>
            <input type="radio" id='female' name='gender' value='Female' checked={userData.gender == 'Female'} onChange={userDataHandler} />
          </div>
          <div>
            <label htmlFor="tac">Terms and Conditions: </label>
            <input type="checkbox" id='tac' name='tac' checked={userData.tac == true} onChange={userDataHandler}></input>
          </div>

          {userData.tac && <button>Login</button>}
          

        </form>
      </header>
    </div>
  );
}

export default App;
