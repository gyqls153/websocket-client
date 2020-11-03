import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

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
    padding-top: 150px;
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
    color: black;
    text-align: center;
    margin: 0px;
    padding-top: 0px;
    `

    const LOGO = styled.img`
    width: 150px;
    position: absolute; 
    left: 50%; transform: translateX(-50%);
    top: 50px;
    `

    const GAME_SELECTION = styled.img`
    width: 150px;
    `

    const GAME_CONTROLL = styled.img`
    width: 150px;
    `

    const CONTROLL_WRAP = styled.div`
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    `;

const MAIN_BACKGROUND = styled.div`
background-color: #D5D5D5;
height: 100vh;
`

    return (
        <>
            <HEADER>
                <LOGO src="Admin/Login_Logo.png"></LOGO>
                <NANUM_GOTHIC_1>Spark 02</NANUM_GOTHIC_1>
                <NANUM_GOTHIC_2>dsfsddfsd-dfdsfds-dsfdsfs-fdsfds</NANUM_GOTHIC_2>
            </HEADER>
            <MAIN_BACKGROUND>
                <div>
                 <NANUM_GOTHIC_3>Content With</NANUM_GOTHIC_3>
                </div>
                <CONTROLL_WRAP>
                    <GAME_SELECTION src="Remote/Btn_Menu.PNG"></GAME_SELECTION>
                    <GAME_CONTROLL src="Remote/Btn_Control.PNG"></GAME_CONTROLL>
                </CONTROLL_WRAP>
            </MAIN_BACKGROUND>
        </>
    )
}

export default Admin_Setting_Selected_Device;