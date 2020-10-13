import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAdminLoginId, useEnableGameDic } from './AppContextProvider';
import ws from './WebSocket';
import CastConnectedIcon from '@material-ui/icons/CastConnected';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

function Admin_Setting_2() {
  const loginId = useAdminLoginId();

  const [gameList, setGameList] = useState([]);

  const [serialList, setSerialList] = useState([]);

  const [showGameList, setShowGameList] = useState(false);

  const [openGameList, setOpenGameList] = useState({});

  const [currentSerial, set_currentSerial] = useState(0);

  useEffect(() => {
    async function func2() {
      await Axios.post('/serial_list', {
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

    func2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeGameCheckValue = (e, data) => {
    let newOpenGameList = {};

    for (const key of Object.keys(openGameList)) {
      newOpenGameList[key] = openGameList[key];
    }

    newOpenGameList[data.id] = !newOpenGameList[data.id];
    setOpenGameList(newOpenGameList);
  };

  const onClickedInsertButton = (idx) => {
    console.log(idx);
    Axios.post('/openGameList_FromSerial', {
      Serial: serialList[idx],
    })
      .then((response) => {
        console.log(response.data);
        set_currentSerial(serialList[idx]);
        setShowGameList(true);

        let newBuyGameList = {};

        const buyGameList = response.data.buyGameList;

        for (const key of Object.keys(buyGameList)) {
          newBuyGameList[key] = buyGameList[key];
        }

        setGameList(newBuyGameList);

        let openGameList = [];
        if (response.data.openGameList.length > 0)
          openGameList = JSON.parse(response.data.openGameList);

        let newOpenGameList = {};

        for (const key of Object.keys(openGameList)) {
          console.log(key);
          newOpenGameList[key] = openGameList[key];
        }

        setOpenGameList(newOpenGameList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClick_UpdateSerialSlot = () => {
    console.log(currentSerial);
    Axios.post('/update_openGameList', {
      Serial: currentSerial,
      openGameList: openGameList,
    })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const items = [];

  for (const i of Object.keys(gameList)) {
    const data = gameList[i];
    items.push(
      <div key={i}>
        <label htmlFor={'game_' + i}>{data.Title}</label>
        <input
          name={'game_' + i}
          checked={!!openGameList[data.id]}
          onChange={(e) => changeGameCheckValue(e, data)}
          type="checkbox"
        />
      </div>
    );
  }

  console.log(items);

  const onClickedRemoteCommand = (command) => {
    console.log(command);
    ws.send(
      JSON.stringify({
        From: 'WebClient',
        PacketType: 'RemoteCommand',
        Serial: currentSerial,
        subData: command,
      })
    );
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
    submit2: {
      margin: theme.spacing(1, 0, 1),
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <p>Device 리스트</p>
            <div>
                {
                    serialList && serialList.map((data, i) => {
                        return (
                            <div key={i}>
                            <div>
                                <label htmlFor={"game_" + i}>{data}</label> 
                            </div>
                            <div>
                                
                                <button onClick={(e) => onClickedInsertButton(i)}>선택</button>

                                <button onClick={(e) => onClickedRemoteCommand("UP")}>위</button>
                                <button onClick={(e) => onClickedRemoteCommand("DOWN")}>아래</button>
                                <button onClick={(e) => onClickedRemoteCommand("LEFT")}>왼쪽</button>
                                <button onClick={(e) => onClickedRemoteCommand("RIGHT")}>오른쪽</button>
                                <button onClick={(e) => onClickedRemoteCommand("RETURN")}>리턴</button>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
            {showGameList && <div>
                <button onClick={() => {onClick_UpdateSerialSlot()}}>등록완료</button>
                <p>게임 리스트</p>
                <div>
                    {items}
                </div>
                
                </div>} */}

      {/* 여기서 하드코딩 */}
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <CastConnectedIcon className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </CastConnectedIcon>
          <Typography component="h1" variant="h5">
            Device 선택
          </Typography>

          <div className="topSection">
            <div class="topList">
              <Typography component="h2" variant="h7">
                Serial Number
              </Typography>
              <ul>
                {serialList &&
                  serialList.map((data, i) => {
                    return (
                      <li key={i}>
                        <div className="serialNum">
                          <label htmlFor={'game_' + i}>{data}</label>
                        </div>
                        <div class="topListButton">  
                           <Button
                            onClick={(e) => onClickedInsertButton(i)}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit2}
                            // onClick={}
                          >
                            선택
                          </Button>
                          <Button
                            onClick={(e) => onClickedInsertButton()}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit2}
                            onClick={handleOpen}
                          >
                            조작
                          </Button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <div className="modal">
                    <div className="joyStick">
                      <div
                        className="up"
                        onClick={(e) => onClickedRemoteCommand('UP')}
                      >
                        <p>UP</p>
                      </div>
                      <div
                        className="down"
                        onClick={(e) => onClickedRemoteCommand('DOWN')}
                      >
                        <p>DOWN</p>
                      </div>
                      <div
                        className="return"
                        onClick={(e) => onClickedRemoteCommand('enter')}
                      >
                        <p>ENTER</p>
                      </div>
                      <div
                        className="left"
                        onClick={(e) => onClickedRemoteCommand('LEFT')}
                      >
                        <p>LEFT</p>
                      </div>
                      <div
                        className="right"
                        onClick={(e) => onClickedRemoteCommand('RIGHT')}
                      >
                        <p>RIGHT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </Modal>
            <div class="submitButton">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  onClick_UpdateSerialSlot();
                }}
              >
                등록
              </Button>
            </div>
          </div>

          <div className="bottomSection">
            <Typography component="h1" variant="h6">
              Game List
            </Typography>
            <ul className="list">
              {showGameList && <li>{items}</li>}
  
            </ul>
          </div>

          <div></div>
        </div>
      </Container>
    </>
  );
}

export default Admin_Setting_2;
