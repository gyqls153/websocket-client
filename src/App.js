import React from 'react';
import logo from './logo.svg';
import './App.css';
import ws from './WebSocket';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

axios.default.baseURL = 'http://localhost:3000';

function test()
{
  //ws.send(JSON.stringify(data));
  
  axios.post('/admin_join')
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
          <button onClick= {test}>Click me</button>
          <button onClick= {test2}>Click me</button>
        </div>
      </header>
    </div>
  );
}

export default App;
