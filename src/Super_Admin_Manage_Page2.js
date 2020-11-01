
import styled from 'styled-components'
import React from 'react';


const HEADER = styled.div`
    background-color: red;
    height: 70px;
`;

const LOGO = styled.img`
width: 100px;
position: absolute; 
left: 50%; transform: translateX(-50%);
top: 2%
`

const NANUM_GOTHIC = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: black;
    text-align: center;
    margin: 0px;
    `

const INPUT = styled.input`
    margin-bottom: 10px;
    height: 3vh;  
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    width: 50%;
    background-Color: white;
    padding: 0px;
    margin-left: 25%;
    `

const MAINBACKGROUND = styled.div`
    background-color: gray;
    height: 100vh;
`;

const BUTTON = styled.button`
    position:absolute; 
    bottom:10px;
    left: 25%;
    width: 50%;
    height: 6vh;
    background-Color: red;
    border: 0;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 20px;
    color: white;
    font-weight: bold;
  `

function Super_Admin_Manage_Page2(props) {
    return(
        <>
            <HEADER>
                <LOGO src="Super_Admin/Login_Logo.png"></LOGO>
            </HEADER>
            <MAINBACKGROUND>
                <NANUM_GOTHIC>Registration information</NANUM_GOTHIC>
                <INPUT type="text" placeholder="할당 ID" id="id"></INPUT>
                <INPUT type="password" placeholder="Password" id="password"></INPUT>
                <INPUT type="password" placeholder="Password_Verify" id="password_verify"></INPUT>
                <BUTTON>등록</BUTTON>
            </MAINBACKGROUND>
        </>
    );
}

export default Super_Admin_Manage_Page2;