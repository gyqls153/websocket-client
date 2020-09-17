import React from 'react';
import logo from './logo.svg';
import './App.css';
import ws from './WebSocket';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function test()
{
  //ws.send(JSON.stringify(data));
  
  axios.get('/user')
  .then(function (response) { console.log(response); })
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="text" id="id" />
        <input type="password" id="password" />
        <input type="password" id="password_verify" />
        <button onClick= {test}>Click me</button>
        <button onClick= {test2}>Click me</button>
      </header>
    </div>
  );
}

export default App;
