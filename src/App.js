import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, HashRouter } from 'react-router-dom';
import Super_Admin_Main from './Super_Admin_Main'
import Home from './Home'
import axios from 'axios';
import AppContextProvider from './AppContextProvider';
import Super_Admin_UserSetting from './Super_Admin_UserSetting';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <AppContextProvider>
      <Router>
          <Switch>
              <Route path ='/admin_main' component={Super_Admin_Main}></Route>
              <Route path ='/admin_userSetting' component={Super_Admin_UserSetting}></Route>
          </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
