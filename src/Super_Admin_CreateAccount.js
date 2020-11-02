import React, {useContext, useEffect, useState} from 'react';
import ws from './WebSocket';
import axios from 'axios';
import AppContextProvider, {
  useAdminInfo_List,
  useName,
  useAddAdminInfo,
  useSetSelectedLoginId,
  useSetSerialInfoList,
  useSetEnableGameDic
} from './AppContextProvider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components'


function Super_Admin_CreateAccount(props) {
  const [adminInfoList_recv, setAdminInfoList_recv] = useState(false);
  const [adminInfoList, setAdminInfoList] = useState([]);

  useEffect(() => {
    async function func() {
      await axios.post('/adminInfo_list', {}).then(function (response) {

        if (!adminInfoList_recv) 
          setAdminInfoList(response.data);
        
        setAdminInfoList_recv(true);
      }).catch(function (error) {
        console.log(error);
      });
    }

    func();

  }, [adminInfoList, adminInfoList_recv]);

  function joinAdminUser() {
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;
    const password_verify = document.getElementById("password_verify").value;
    const name = document.getElementById("name").value;

    if (password !== password_verify) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios.post('/admin_join', {
      id: id,
      password: password,
      name: name
    }).then(function (response) {
      if (response.data.isSuccess) {
        alert("등록 성공")
        setAdminInfoList_recv(false);
      } else {
        alert(response.data.errorMsg);
      }
      console.log(response);
    }).catch(function (error) {});
  }

  let setSelectedLoginId = useSetSelectedLoginId();
  const setSerialInfoList = useSetSerialInfoList();
  const setEnableGameDic = useSetEnableGameDic();

  const onClickButton = (idx) => {
    axios.post('/serial_list', {loginId: adminInfoList[idx].loginId}).then(function (response) {
      setSelectedLoginId(adminInfoList[idx].loginId);
      setSerialInfoList(response.data);
      axios.post('/get_enable_game_list', {loginId: adminInfoList[idx].loginId}).then(function (response) {
        setEnableGameDic(response.data);
        props.history.push("/super_admin_userSetting");
      }).catch(function (error) {
        console.log(error)
      })

    }).catch(function (error) {
      console.log(error);
    });
  }

  const onClickRemoveButton = (idx) => {
    axios.post('/RemoveId', {loginId: adminInfoList[idx].loginId}).then(function (response) {
      setAdminInfoList(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    submit2: {
      margin: theme.spacing(3, 0, 2)
    },
    submit3: {
      margin: theme.spacing(3, 0, 2)
    },
    submit4: {
      width: 200
    }
  }));
  const classes = useStyles();


  const NANUM_GOTHIC = styled.p`
  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
  font-family: 'Nanum Gothic', sans-serif;
  color: black;
  `

  const LOGO = styled.img`
  width: 100px;
  position: absolute; 
  left: 50%; transform: translateX(-50%);
  top: 2%;
  `
  const MAIN_BACKGROUND = styled.div`
  background-Color: gray;
  height: 100vh;
  display: flex;
  `

  const FORM = styled.div`
  background-Color: gray;
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
    border: 0px;
    border-radius: 5px;
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
  
  const HEADER = styled.div`
      background-color: red;
      height: 70px;
  `;


  const BACKBUTTON = styled.img`
    width: 20px;
    margin-left: 10px;
    margin-top: 10px;
    `

  return (
    <>
    <HEADER>
        <BACKBUTTON onClick={() => props.history.goBack()} src="Remote/Btn_BackArrow.PNG"></BACKBUTTON>
        <LOGO src="Super_Admin/Login_Logo.png"></LOGO>
    </HEADER>
    <MAIN_BACKGROUND>
    <FORM>
      <ACCOUNT_LABEL><NANUM_GOTHIC>Registration information</NANUM_GOTHIC></ACCOUNT_LABEL>
      <INPUT type="text" placeholder="할당 ID" id="id"></INPUT>
      <INPUT type="text" placeholder="Name" id="name"></INPUT>
      <INPUT type="password" placeholder="Password" id="password"></INPUT>
      <INPUT type="password" placeholder="Confirm Password" id="password_verify"></INPUT>
      <BUTTON onClick={joinAdminUser}>등록</BUTTON>
    </FORM>
    </MAIN_BACKGROUND></>
  );
};

export default Super_Admin_CreateAccount;
