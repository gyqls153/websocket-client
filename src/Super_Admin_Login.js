import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function Super_Admin_Login() {


    const NANUM_GOTHIC = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: black;
    `
  
    const LOGO = styled.img`
    width: 150px;
    position: absolute; 
    left: 50%; transform: translateX(-50%);
    top: 5%;
    `
    const MAIN_BACKGROUND = styled.div`
    background-Color: gray;
    height: 100vh;
    display: flex;
    `
  
    const FORM = styled.div`
    background-Color: white;
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
      @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
      font-family: 'Nanum Gothic', sans-serif;
      width: 150px;
      background-Color: white;
      border-radius: 5px;
      border: 0px;
    `
  
    const ACCOUNT_LABEL = styled.label`
      margin-top: 80px;
      margin-bottom: 30px;
      display: block;
    `
  
    const BUTTON = styled.button`
      position:absolute; 
      bottom:10px;
      width: 80%;
      height: 7vh;
      padding-left: 30px;
      padding-right: 30px;
      background-Color: red;
      border: 0;
      @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
      font-family: 'Nanum Gothic', sans-serif;
      font-size: 20px;
      color: white;
      font-weight: bold;
    `
  
    return (
      <MAIN_BACKGROUND>
      <FORM>
        <ACCOUNT_LABEL><NANUM_GOTHIC>로그인</NANUM_GOTHIC></ACCOUNT_LABEL>
        <LOGO src="Super_Admin/Login_Logo.png"></LOGO>
        <INPUT type="text" placeholder="ID" id="id"></INPUT>
        <INPUT type="password" placeholder="Password" id="password"></INPUT>
        <BUTTON>등록</BUTTON>
      </FORM>
      </MAIN_BACKGROUND>
    );
}

export default Super_Admin_Login