import React from 'react';
import logo from './logo.svg';
import './App.css';
import './signin.css';
import './list.css';
import { BrowserRouter as Router, Route, Switch, Link, HashRouter } from 'react-router-dom';
import Super_Admin_CreateAccount from './Super_Admin_CreateAccount'
import Home from './Home'
import axios from 'axios';
import AppContextProvider from './AppContextProvider';
import Super_Admin_UserSetting_Main from './Super_Admin_UserSetting_Main';
import Admin_Main from './Admin_Main';
import Admin_Setting from './Admin_Setting'
import Admin_Setting_New from './Admin_Setting_New'
import config from './config.json'
import GameControllModal from './GameControlModal';
import Super_Admin_Login from './Super_Admin_Login';
import Super_Admin_Manage_Page1 from './Super_Admin_Manage_Page1';
import Super_Admin_Manage_Page2 from './Super_Admin_Manage_Page2';
import Super_Admin_Manage_Page3 from './Super_Admin_Manage_Page3';
import Admin_Setting_Selected_Device from './Admin_Setting_Selected_Device'

axios.defaults.baseURL = `http://${config[config.ENV].addressIp}`;

function App() {
  return (
    <AppContextProvider>
      <Router>
          <Switch>
              <Route path ='/' exact component={Admin_Main}></Route>
              <Route path ='/admin_setting' component={Admin_Setting}></Route>
              <Route path ='/admin_setting_new' component={Admin_Setting_New}></Route>
              <Route path ='/admin_setting_selected_device' component={Admin_Setting_Selected_Device}></Route>
              <Route path ='/super_admin_create_account' component={Super_Admin_CreateAccount}></Route>
              <Route path ='/super_admin_userSetting' component={Super_Admin_UserSetting_Main}></Route>
              <Route path ='/game_controll_modal' component={GameControllModal}></Route>
              <Route path ='/super_admin_login' component={Super_Admin_Login}></Route>
              <Route path ='/super_admin_manage_page1' component={Super_Admin_Manage_Page1}></Route>
              <Route path ='/super_admin_manage_page2' component={Super_Admin_Manage_Page2}></Route>
              <Route path ='/super_admin_manage_page3' component={Super_Admin_Manage_Page3}></Route>

          </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
