import { Fade, makeStyles, Modal } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import React, { useEffect, useState } from "react";
import { useSelectedSerial } from "./AppContextProvider";
import ws from './WebSocket';
import styled from 'styled-components'

const ARROW_UP_BTN = styled.img`
  position: absolute;
  transform:translateX(-50%) translateY(-180%) rotate(270deg);
  left:50%;
  top:310px;
  border : 0;
  width: 100px;
  &:active {
    content:url("Remote/ArrowRight.png");
    width: 55px;
  }
`

const ARROW_LEFT_BTN = styled.img`
  position: absolute;
  transform:translateX(-170%) translateY(-60%) rotate(180deg);
  left:50%;
  top:310px;
  border : 0;
  width: 100px;
  &:active {
    content:url("Remote/ArrowRight.png");
    width: 55px;
    transform:translateX(-270%) translateY(-60%) rotate(180deg);
  }
`

const ARROW_RIGHT_BTN = styled.img`
  position: absolute;
  transform:translateX(70%) translateY(-60%) rotate(0deg);
  left:50%;
  top:310px;
  border : 0;
  width: 100px;
  &:active {
    content:url("Remote/ArrowRight.png");
    width: 55px;
    transform:translateX(170%) translateY(-60%) rotate(0deg);
  }
`

const ARROW_DOWN_BTN = styled.img`
  position: absolute;
  transform:translateX(-50%) translateY(60%) rotate(90deg);
  left:50%;
  top:310px;
  border : 0px;
  width: 100px;
  &:active {
    content:url("Remote/ArrowRight.png");
    width: 55px;
  }
`

const ARROW_CENTOR_BTN = styled.img`
  position: absolute;
  transform:translateX(-50%) translateY(-60%) rotate(90deg);
  left:50%;
  top: 310px;
  border : 0;
  width: 100px;
  &:active {
    content:url("Remote/ArrowCenter.png");
  }
`

const JOYSTICK_ON = styled.img`
  position: absolute;
  width: 60px;
  right: 15px;
  top: 100px;
  `

const JOYSTICK_OFF = styled.img`
  position: absolute;
  width: 60px;
  right: 15px;
  top: 100px;
`

const HEADER = styled.div`
  width: 100%;
  height: 80px;
  background-color: black;
  position: relative;
`

const BACK_BUTTON = styled.img`
  width: 20px;
  height: 30px;
  margin-top: 25px;
  margin-left: 15px;
`

const HOME_BUTTON = styled.button`
    position: absolute;
    bottom: 30px;
    width: 40%;
    margin-left: 51%;
    padding: 10px 0;
    text-align: center;
    color: white;
    border: 0;
    background: #CC2126;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    font-size: 20px;
`

const BACKBUTTON = styled.button`
    position: absolute;
    bottom: 30px;
    width: 40%;
    padding: 10px 0;
    margin-left: 9%;
    text-align: center;
    color: white;
    border: 0;
    background: black;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    font-size: 20px;
`

const NANUM_GOTHIC = styled.p`
@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
font-family: 'Nanum Gothic', sans-serif;
color: white;
position: absolute;
top: -7px;
left: 50%;
transform:translateX(-50%);
font-weight: bold;
font-size: 30px;
`

const MAIN_BACKGROUND = styled.div`
display: flex;
`

function GameControlModal(props)
{
    const send = (message, callback) => {
      waitForConnection(function () {
          ws.send(message);
          if (typeof callback !== 'undefined') {
            callback();
          }
      }, 1000);
  };

  const waitForConnection = (callback, interval) => {
      if (ws.readyState === 1) {
          callback();
      } else {
          // optional: implement backoff for interval here
          setTimeout(function () {
              waitForConnection(callback, interval);
          }, interval);
      }
  };

    const curentSerial = useSelectedSerial();

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

      const onClickedRemoteCommand = (command) => {
        send(
          JSON.stringify({
            From: 'WebClient',
            PacketType: 'RemoteCommand',
            Serial: curentSerial,
            subData: command,
          })
        );
      };

      useEffect(() => {
        console.log(open);

        if (open)
        {
          onClickedRemoteCommand('CONTROL-ON');
        }
        else
        {
          onClickedRemoteCommand('CONTROL-OFF');
        }
        return () => {
          onClickedRemoteCommand('CONTROL-OFF');
        } 
      }, [open]);


    return (
      <MAIN_BACKGROUND>
        <HEADER>
          <BACK_BUTTON src= "Remote/Btn_BackArrow.PNG" onClick={() => props.history.goBack()}></BACK_BUTTON>
          <NANUM_GOTHIC>Joystick</NANUM_GOTHIC>
        </HEADER>
        {open ? <JOYSTICK_ON src= "Remote/Btn_On.PNG" onClick={() => setOpen(false)}></JOYSTICK_ON> : <JOYSTICK_OFF src= "Remote/Btn_Off.PNG" onClick={() => setOpen(true)}></JOYSTICK_OFF>}
        <ARROW_UP_BTN onClick={() => onClickedRemoteCommand('UP')} src="Remote/Btn_Arrow.PNG"/>
        <ARROW_DOWN_BTN onClick={() => onClickedRemoteCommand('DOWN')} src="Remote/Btn_Arrow.PNG"/>
        <ARROW_LEFT_BTN onClick={() => onClickedRemoteCommand('LEFTS')} src="Remote/Btn_Arrow.PNG"/>
        <ARROW_RIGHT_BTN onClick={() => onClickedRemoteCommand('RIGHT')} src="Remote/Btn_Arrow.PNG"/>
        <ARROW_CENTOR_BTN onClick={() => onClickedRemoteCommand('RETURN')} src="Remote/Btn_Center.PNG"/>
        <BACKBUTTON onClick={() => onClickedRemoteCommand('BACK')}>Back</BACKBUTTON>
        <HOME_BUTTON onClick={() => onClickedRemoteCommand('HOME')}>Home</HOME_BUTTON>
      </MAIN_BACKGROUND>
      
    )
}

export default GameControlModal;

