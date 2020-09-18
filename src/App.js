import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Admin_Main from './Admin_Main'
import Home from './Home'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <Router>
        <div className='Contents-wrapper'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/admin_main' component={Admin_Main} />
          </Switch>
        </div>
        <div className='Menu-wrapper'>
          <ul>
            <Link to='/'><li>Home</li></Link>
            <Link to='/admin_main'><li>Admin_Main</li></Link>
          </ul>
        </div>
      </Router>
      </header>
    </div>
  );
}

export default App;
