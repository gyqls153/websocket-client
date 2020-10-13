import React, { useContext, useEffect, useState } from 'react';
import ws from './WebSocket';
import axios from 'axios';
import AppContextProvider, { useAdminInfo_List, useName, useAddAdminInfo, useSetSelectedLoginId, useSetSerialInfoList, useSetEnableGameDic, useSetAdminLoginId } from './AppContextProvider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
function Admin_Main(props) {
  
  const setAdminLoginId = useSetAdminLoginId();

  function joinAdminUser()
  {
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    axios.post('/admin_login', {
      loginId : id,
      password : password
    })
    .then(function (response) { 
      if (response.data.isSuccess)
      {
        setAdminLoginId(id);
        // 로그인
        props.history.push("/admin_setting");
      }
      else
      {
        alert(response.data.errorMsg);
      }
      console.log(response);
    })
    .catch(function (error) { });
  }
  
    return (
        <div className="App-Admin-Join">
          <div>
            <label>ID</label>
            <input type="text" id="id" />
          </div>
          <div>
            <label>PASSWORD</label>
            <input type="password" id="password" />
          </div>
          <button onClick= {joinAdminUser}>로그인</button>
        </div>
    );
};

export default Admin_Main;