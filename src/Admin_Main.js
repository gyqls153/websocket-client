import React, { useContext, useEffect, useState } from 'react';
import ws from './WebSocket';
import axios from 'axios';
import AppContextProvider, {
  useAdminInfo_List,
  useName,
  useAddAdminInfo,
  useSetSelectedLoginId,
  useSetSerialInfoList,
  useSetEnableGameDic,
  useSetAdminLoginId,
} from './AppContextProvider';
// import Avatar from '@material-ui/core/Avatar';
import Avatar from '../node_modules/@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import config from './config.json'
import styled from 'styled-components'

function Admin_Main(props) {
  const setAdminLoginId = useSetAdminLoginId();

  function joinAdminUser() {
    const id = document.getElementById('User_Name').value;
    const password = document.getElementById('Password').value;

    axios
      .post('/admin_login', {
        loginId: id,
        password: password,
      })
      .then(function (response) {
        if (response.data.isSuccess) {
          setAdminLoginId(id);
          // 로그인
          props.history.push('/admin_setting');
        } else {
          alert(response.data.errorMsg);
        }
        console.log(response);
      })
      .catch(function (error) {});
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(30),
      marginLeft: theme.spacing(30),
      marginRight: theme.spacing(30),
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  const NANUM_GOTHIC = styled.p`
  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
  font-family: 'Nanum Gothic', sans-serif;
  color: white;
  `

  const LOGO = styled.img`
  width: 150px;
  position: absolute; 
  left: 50%; transform: translateX(-50%);
  top: 5%
  `
  const MAIN_BACKGROUND = styled.div`
  background-Color: black;
  height: 100vh;
  display: flex
  `

  const FORM = styled.div`
  background-Color: black;
  height: 50vh;
  position: absolute; 
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 30vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  `

  const INPUT = styled.input`
    margin-bottom: 10px;
    height: 3vh;
    margin-left: 10px;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    width: 80%;
    background-Color: white;
  `

  const ACCOUNT_LABEL = styled.label`
    margin-top: 30px;
    margin-bottom: 30px;
  `

  const BUTTON = styled.button`
    position:absolute; 
    bottom:0px;
    width: 100%;
    height: 7vh;
    background-Color: red;
    border: 0;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 20px;
    color: white;
    font-weight: bold;
  `

  return (
    <MAIN_BACKGROUND>
    <LOGO src="Remote/Logo_Spark.png"></LOGO>
    <FORM>
      <ACCOUNT_LABEL><NANUM_GOTHIC>Sign In</NANUM_GOTHIC></ACCOUNT_LABEL>
      <INPUT type="text" placeholder="User Name" id="User_Name"></INPUT>
      <INPUT type="password" placeholder="Password" id="Password"></INPUT>
      <BUTTON onClick={joinAdminUser}>Login</BUTTON>
    </FORM>
    </MAIN_BACKGROUND>
  );
}

export default Admin_Main;
