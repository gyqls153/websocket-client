import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useSelectedSerial, useSelectedSerialName } from './AppContextProvider';

function Admin_Setting_Selected_Device(props)
{
    const HEADER = styled.div`
    background-color: black;
    height: 200px;
    `;
        
    const NANUM_GOTHIC_1 = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    text-align: center;
    margin: 0px;
    padding-top: 80px;
    `

    const NANUM_GOTHIC_2 = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    text-align: center;
    margin: 0px;
    padding-top: 0px;
    `

    const NANUM_GOTHIC_3 = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 30px;    
    color: black;
    text-align: center;
    margin: 0px;
    padding-top: 40px;
    `

    const LOGO = styled.img`
    width: 150px;
    position: absolute; 
    left: 50%; transform: translateX(-50%);
    top: 50px;
    `

    const GAME_SELECTION = styled.img`
    margin-right: 20px;
    width: 150px;
    `

    const GAME_CONTROLL = styled.img`
    width: 150px;
    `

    const CONTROLL_WRAP = styled.div`
        display: flex;
        justify-content: center;
        margin-top: 100px;
    `;

    const MAIN_BACKGROUND = styled.div`
    `

    const BACKBUTTON = styled.img`
    width: 20px;
    height: 30px;
    margin-top: 25px;
    margin-left: 5px;
    `

    const goToGameSelection = () => {
        props.history.push("admin_setting_game_selection");
    }

    const goToGameControll = () => {
        props.history.push("game_controll_modal");
    }

    const selectedSerial = useSelectedSerial();
    const selectedSerialName = useSelectedSerialName();

    return (
        <>
            <HEADER>
                <BACKBUTTON onClick={() => props.history.goBack()} src="Remote/Btn_BackArrow.PNG"></BACKBUTTON>
                <LOGO src="Admin/Login_Logo.png"></LOGO>
                <NANUM_GOTHIC_1>{selectedSerialName}</NANUM_GOTHIC_1>
                <NANUM_GOTHIC_2>{selectedSerial}</NANUM_GOTHIC_2>
            </HEADER>
            <MAIN_BACKGROUND>
                <div>
                 <NANUM_GOTHIC_3>Content With</NANUM_GOTHIC_3>
                </div>
                <CONTROLL_WRAP>
                    <GAME_SELECTION onClick={() => goToGameSelection()} src="Remote/Btn_Menu.PNG"></GAME_SELECTION>
                    <GAME_CONTROLL onClick={() => goToGameControll()} src="Remote/Btn_Control.PNG"></GAME_CONTROLL>
                </CONTROLL_WRAP>
            </MAIN_BACKGROUND>
        </>
    )
}

export default Admin_Setting_Selected_Device;