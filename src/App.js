import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Super_Admin_Main from './Super_Admin_Main'
import Home from './Home'
import axios from 'axios';
import AppContextProvider from './AppContextProvider';

axios.defaults.baseURL = 'http://localhost:3000';

function App() {
  return (
    <AppContextProvider>
      <Super_Admin_Main/>
    </AppContextProvider>
  );
}

export default App;
