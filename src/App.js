import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, HashRouter } from 'react-router-dom';
import Super_Admin_Main from './Super_Admin_Main'
import Home from './Home'
import axios from 'axios';
import AppContextProvider from './AppContextProvider';
import Super_Admin_UserSetting_Main from './Super_Admin_UserSetting_Main';
import Admin_Main from './Admin_Main';
import Admin_Setting from './Admin_Setting'
import config from './config.json'

axios.defaults.baseURL = `http://${config[config.ENV].addressIp}`;

function App() {
  return (
    <AppContextProvider>
      <Router>
          <Switch>
              <Route path ='/' exact component={Admin_Main}></Route>
              <Route path ='/admin_setting' component={Admin_Setting}></Route>
              <Route path ='/super_admin_main' component={Super_Admin_Main}></Route>
              <Route path ='/super_admin_userSetting' component={Super_Admin_UserSetting_Main}></Route>
          </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
