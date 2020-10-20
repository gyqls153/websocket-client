import { Fade, makeStyles, Modal } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import React, { useEffect, useState } from "react";
import { useSelectedSerial } from "./AppContextProvider";
import ws from './WebSocket';

function GameControlModal({history})
{
    console.log("GameControlModal");

    let [isOn, setOnOff] = useState(false);
    
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


    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = (e) => {
        setOpen(false);
      };

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
        onClickedRemoteCommand('CONTROL-OFF');
        return () => {
          onClickedRemoteCommand('CONTROL-OFF');
        } 
      }, []);


    return (<Modal
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
            <div className={isOn ? "on" : "off"}
                onClick={(e) => {
                  if (isOn)
                  {
                    onClickedRemoteCommand('CONTROL-OFF') 
                    setOnOff(false);
                  }
                    
                  else
                  {
                    onClickedRemoteCommand('CONTROL-ON')
                    setOnOff(true);
                  }
                  }
                }>
                <p>{isOn ? "on" : "off"}</p>
            </div>
            <div
              className="up"
              onClick={(e) => onClickedRemoteCommand('UP')}
            >
            </div>
            <div
              className="down"
              onClick={(e) => onClickedRemoteCommand('DOWN')}
            >
            </div>
            <div 
              className="return"
              onClick={(e) => onClickedRemoteCommand('RETURN')}
            >
            </div>
            <div
              className="left"
              onClick={(e) => onClickedRemoteCommand('LEFT')}
            >
            </div>
            <div
              className="right"
              onClick={(e) => onClickedRemoteCommand('RIGHT')}
            >
            </div>
            <div
              className="back"
              onClick={(e) => onClickedRemoteCommand('BACK')}
            >
              <p>BACK</p>
            </div>
            <div
              className="home"
              onClick={(e) => onClickedRemoteCommand('HOME')}
            >
                <p>HOME</p>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  </Modal>)
}

export default GameControlModal;