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

function Super_Admin_Main(props) {
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

    if (password !== password_verify) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios.post('/admin_join', {
      id: id,
      password: password
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

  return (
    <div className="App-Admin-Join">

      <Grid container
        spacing={3}>
        <Grid item
          xs={6}>
          <div className="boxLeft">
            <CssBaseline/>
            <div className={
              classes.paper
            }>
              <Avatar className={
                classes.avatar
              }>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                관리자 등록
              </Typography>
              <form className={
                  classes.form
                }
                noValidate>
                <TextField variant="outlined" margin="normal" required fullWidth id="id" label="아이디" name="ID" autoComplete="ID" autoFocus/>
                <TextField variant="outlined" margin="normal" required fullWidth name="password" label="비밀번호" type="password" id="password" autoComplete="current-password"/>
                <TextField variant="outlined" margin="normal" required fullWidth name="password_verify" label="비밀번호확인" type="password_verify" id="password_verify" autoComplete="current-password"/>
                <Button type="button" fullWidth variant="contained" color="primary"
                  className={
                    classes.submit
                  }
                  onClick={joinAdminUser}>
                  등록하기
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */} </Grid>
                  <Grid item>
                    {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */} </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}></Box>
          </div>
        </Grid>
        <Grid item
          xs={6}>
          <div className="box">
            <table>
              <tbody>{adminInfoList.length > 0 && adminInfoList.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <div className={
                              classes.submit4
                            }>{
                          data.loginId
                        }</div>
                        <div className="group_Left">
                          <Button type="submit" size="small" variant="contained" color="primary"
                            className={
                              classes.submit2
                            }
                            onClick={
                              () => {
                                onClickButton(i)
                              }
                          }>선택</Button>

                          <Button size="small" variant="contained" color="primary"
                            className={
                              classes.submit3
                            }
                            onClick={
                              () => {
                                onClickRemoveButton(i)
                              }
                          }>삭제</Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }</tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </div>


  );
};

export default Super_Admin_Main;
