import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  useSetEnableGameDic,
  useSelectedLoginId,
  useSerialInfoList,
  useSetSerialInfoList,
  useSetSelectedLoginId,
} from './AppContextProvider';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function Super_Admin_UserSetting_2(props) {
  const loginId = useSelectedLoginId();

  const [gameList, setGameList] = useState([]);

  const [serialList, setSerialList] = useState([]);

  const [showGameList, setShowGameList] = useState(false);

  const [buyGameList, setBuyGameList] = useState({});

  const [currentSerial, set_currentSerial] = useState(0);

  // 시리얼 생성
  function createSerial() {
    axios
      .post('/createSerial')
      .then(function (response) {
        setSerialList([...serialList, response.data.value]);
        const temp_serialList = serialList;
        temp_serialList.push(response.data.value);
        axios
          .post('/updateSerialList', {
            loginId: loginId,
            serialList: temp_serialList,
          })
          .then(function (response) {
            console.log(temp_serialList);
          })
          .catch(function (error) {});
      })
      .catch(function (error) {});
  }

  useEffect(() => {
    async function func() {
      await axios
        .post('/gameList_all', {
          loginId: loginId,
        })
        .then((response) => {
          setGameList(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    async function func2() {
      await axios
        .post('/serial_list', {
          loginId: loginId,
        })
        .then((response) => {
          console.log(response.data);
          setSerialList(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    func();
    func2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeGameCheckValue = (e, data) => {
    let newBuyGameList = {};

    for (const key of Object.keys(buyGameList)) {
      newBuyGameList[key] = buyGameList[key];
    }

    newBuyGameList[data.id] = !newBuyGameList[data.id];
    setBuyGameList(newBuyGameList);
  };

  const onClickedInsertButton = (idx) => {
    axios
      .post('/buyGameList_FromSerial', {
        Serial: serialList[idx],
      })
      .then((response) => {
        set_currentSerial(serialList[idx]);
        setShowGameList(true);

        console.log(response.data);

        let newBuyGameList = {};

        for (const key of Object.keys(response.data)) {
          console.log(key);
          newBuyGameList[key] = response.data[key];
        }

        setBuyGameList(newBuyGameList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickedRemoveButton = (idx) => {
    axios
      .post('/RemoveSerial', {
        Serial: serialList[idx],
        loginId,
      })
      .then((response) => {
        console.log(response.data);
        setSerialList(response.data);
        setBuyGameList({});
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      color: theme.palette.secondary.main,
      fontSize: '3rem',
      //   margin: theme.spacing(0, 0, 5),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper2: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    submit3: {
      margin: theme.spacing(1, 0, 1),
    },
  }));
  const classes = useStyles();

  const onClick_UpdateSerialSlot = () => {
    console.log(buyGameList);
    console.log(currentSerial);
    axios
      .post('/update_buyGameList', {
        Serial: currentSerial,
        buyGameList: buyGameList,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <CastConnectedIcon className={classes.avatar}> */}
          {/* <LockOutlinedIcon /> */}
          {/* </CastConnectedIcon> */}
          <Typography component="h1" variant="h5">
            Device 리스트
          </Typography>

          <div className="topSection-2">
            <div className="serialButton">
              <Button
                onClick={() => createSerial()}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit3}
              >
                시리얼생성
              </Button>
            </div>
            <div className="topList">
              <ul>
                {serialList &&
                  serialList.map((data, i) => {
                    return (
                      <li key={i}>
                        <div className="serialNum">
                          <label htmlFor={'game_' + i}>{data}</label>
                        </div>
                        <div className="listButton">
                          <Button
                            onClick={(e) => onClickedInsertButton(i)}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit2}
                          >
                            선택
                          </Button>
                          <Button
                            onClick={(e) => onClickedRemoveButton(i)}
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit2}
                          >
                            삭제
                          </Button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="bottomSection">
            {showGameList && (
              <div>
                <div className="submitBox">
                  <Button
                    onClick={() => {
                      onClick_UpdateSerialSlot();
                    }}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit2}
                  >
                    등록완료
                  </Button>
                </div>
                <Typography component="h1" variant="h6" className="mid-title">
                  Game List
                </Typography>
                <ul className="list">
                  {gameList.map((data, i) => {
                    return (
                      <li key={i}>
                        <Checkbox
                          color="default"
                          name={'game_' + i}
                          checked={!!buyGameList[data.id]}
                          onChange={(e) => changeGameCheckValue(e, data)}
                        />
                        <label htmlFor={'game_' + i}>{data.Title}</label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Super_Admin_UserSetting_2;
