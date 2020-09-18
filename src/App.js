import React from 'react';
import logo from './logo.svg';
import './App.css';
import ws from './WebSocket';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3000';

// 시리얼 생성
function createSerial()
{
  axios.get('/createSerial')
  .then(function (response) { 
    console.log(response); 
    const textBox = document.getElementById("serialTextBox");
    textBox.value = response.data.value;
  })
  .catch(function (error) { });
}

function test2()
{
  let data = {
    event: "request",
    data: "ble",
    From: "Web"
  }
  ws.send(JSON.stringify(data));
}

function App() {
  return (
    <div className="App">
       {/* <Router>
        <div className='Contents-wrapper'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/community' component={Community} />
            <Route path='/mypage' component={Mypage} />
          </Switch>
        </div>
        <div className='Menu-wrapper'>
          <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/community'><li>Community</li></Link>
            <Link to='/mypage'><li>MyPage</li></Link>
          </ul>
        </div>
      </Router> */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-Admin-Join">
          <div>
            <label>ID</label>
            <input type="text" id="id" />
          </div>
          <div>
            <label>PASSWORD</label>
            <input type="password" id="password" />
          </div>
          <div>
            <label>PASSWORD_VERIFY</label>
            <input type="password" id="password_verify" />
          </div>
          <button onClick= {test2}>Click me</button>
          <input type='text' required = {true} readOnly = {true} value="" id="serialTextBox"></input>
          <button onClick= {createSerial}>시리얼 생성</button>
        </div>
      </header>
    </div>
  );
}

export default App;
