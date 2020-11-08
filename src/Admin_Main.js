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

  const clientHeight = document.documentElement.clientHeight;
  const bottomButtonHeight = clientHeight - 150;
  
  function joinAdminUser() {
    const id = document.getElementById('_id').value;
    const password = document.getElementById('_Password').value;

    axios
      .post('/admin_login', {
        loginId: id,
        password: password,
      })
      .then(function (response) {
        if (response.data.isSuccess) {
          window.sessionStorage.setItem("loginId", id);
          // 로그인
          props.history.push('/admin_setting_new');
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
  width: 200px;
  position: absolute; 
  left: 50%; transform: translateX(-50%);
  top: 100px;
  `
  const MAIN_BACKGROUND = styled.div`
  background-Color: black;
  height: 100vh;
  display: flex;
  `

  const FORM = styled.div`
  height: 500px;
  position: relative; 
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 90vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  `

  const INPUT = styled.input`
    position: absolute;
    height: 50px;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    width: 85%;
    background-Color: white;
    border: 0px;
    margin-top: 300px;
    padding: 0px;
    padding-left: 10px;
    font-size: 20px;
    left: 50%;
    transform:translateX(-50%);
  `

  const INPUT2 = styled.input`
  position: absolute;
  height: 50px;
  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
  font-family: 'Nanum Gothic', sans-serif;
  width: 85%;
  background-Color: white;
  border: 0px;
  margin-top: 370px;
  left: 50%;
  transform:translateX(-50%);
  padding: 0px;
  padding-left: 10px;
  font-size: 20px;
  `


  const ACCOUNT_LABEL = styled.label`
    margin-top: 30px;
    margin-bottom: 30px;
  `

  const BUTTON = styled.button`
    position:absolute; 
    top: ${(props) => props.bottomButtonHeight}px;
    width: calc(85% + 10px);
    height: 70px;
    background-Color: #CC2126;
    border: 0;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 25px;
    color: white;
    border: 0px;
    left: 50%;
    transform:translateX(-50%);
  `

  useEffect(() => {
      document.body.style.backgroundColor = "black";

    return () => {  
      document.body.style.backgroundColor = "#EBEBEB";
    } 
  }, []);

  return (

    <MAIN_BACKGROUND>
    <LOGO src="Admin/Login_Logo.png"></LOGO>
    <INPUT type="text" placeholder="ID" id="_id"></INPUT>
    <INPUT2 type="password" placeholder="Password" id="_Password"></INPUT2>
    <BUTTON bottomButtonHeight={bottomButtonHeight} onClick={joinAdminUser}>Login</BUTTON>
    </MAIN_BACKGROUND>
  );
}

export default Admin_Main;
