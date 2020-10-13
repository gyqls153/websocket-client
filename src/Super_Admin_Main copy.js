import React, { useContext, useEffect, useState } from 'react';
import ws from './WebSocket';
import axios from 'axios';
import AppContextProvider, { useAdminInfo_List, useName, useAddAdminInfo, useSetSelectedLoginId, useSetSerialInfoList, useSetEnableGameDic } from './AppContextProvider';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

function Super_Admin_Main(props) {
  const [adminInfoList_recv, setAdminInfoList_recv] = useState(false);
  const [adminInfoList, setAdminInfoList] = useState([]);

  useEffect(() => {
      async function func(){
      await axios.post('/adminInfo_list', {
      })
      .then(function (response) { 

         if (!adminInfoList_recv)
           setAdminInfoList(response.data);
           setAdminInfoList_recv(true);
      })
      .catch(function (error) { console.log(error); });

    }

    func();

  }, [adminInfoList, adminInfoList_recv]);

  function joinAdminUser()
  {
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;
    const password_verify = document.getElementById("password_verify").value;
  
    if (password !== password_verify)
    {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    axios.post('/admin_join', {
      id : id,
      password : password
    })
    .then(function (response) { 
      if (response.data.isSuccess)
      {
        alert("등록 성공") 
        setAdminInfoList_recv(false);
      }
      else
      {
        alert(response.data.errorMsg);
      }
      console.log(response);
    })
    .catch(function (error) { });
  }
  
    let setSelectedLoginId = useSetSelectedLoginId();
    const setSerialInfoList = useSetSerialInfoList();
    const setEnableGameDic = useSetEnableGameDic();

    const onClickButton = (idx) => {
    axios.post('/serial_list', {
        loginId: adminInfoList[idx].loginId
      })
      .then(function (response) { 
        setSelectedLoginId(adminInfoList[idx].loginId);
        setSerialInfoList(response.data);
        axios.post('/get_enable_game_list', {
          loginId : adminInfoList[idx].loginId
        })
        .then(function (response) {
          setEnableGameDic(response.data);
          props.history.push("/super_admin_userSetting");
        })
        .catch(function(error) {console.log(error)})

       })
      .catch(function (error) { console.log(error); });
    }

    const onClickRemoveButton = (idx) => {
      axios.post('/RemoveId', {
          loginId: adminInfoList[idx].loginId
        })
        .then(function (response) { 
          setAdminInfoList(response.data);
         })
        .catch(function (error) { console.log(error); });
      }

      
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
  const classes = useStyles();

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
          <div>
            <label>PASSWORD_VERIFY</label>
            <input type="password" id="password_verify" />
          </div>
          <button onClick= {joinAdminUser}>관리자 등록</button>
          <table>
            <tbody>
            {
                adminInfoList.length > 0 && adminInfoList.map((data, i)=> {
                  return (<tr key={i}>
                    <td>{data.loginId}</td>
                    <td><button onClick={() => {onClickButton(i)}} >선택</button></td>
                    <td><button onClick={() => {onClickRemoveButton(i)}} >삭제</button></td>
                  </tr>)
                })
            }
          </tbody>
          </table>
        </div>
    );
};

export default Super_Admin_Main;