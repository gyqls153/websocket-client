import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import config from './config.json'

function Super_Admin_Login(props) {


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
    display: flex;
    `
  
    const FORM = styled.div`
    background-Color: white;
    height: 100vw;
    position: absolute; 
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 70vw;
    display: flex;
    align-items: center;
    flex-direction: column;
    `
  
    const INPUT = styled.input`
      margin-bottom: 10px;
      height: 30px;  
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
      height: 50px;
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

    function LoginClick() {
        const id = document.getElementById("id");
        const password = document.getElementById("password");

        console.log(id.value);

        if (config.Super_Admin_ID === id.value){
          if (config.Super_Admin_Password === password.value)
          {
              props.history.push("super_admin_manage_page1");
          }
          else {
            alert("12");
          }
        }
        else{
          alert("2");
        }
    }
  
    return (
      <MAIN_BACKGROUND>
      <FORM>
        <ACCOUNT_LABEL><NANUM_GOTHIC>로그인</NANUM_GOTHIC></ACCOUNT_LABEL>
        <LOGO src="Super_Admin/Login_Logo.png"></LOGO>
        <INPUT type="text" placeholder="ID" id="id"></INPUT>
        <INPUT type="password" placeholder="Password" id="password"></INPUT>
        <BUTTON onClick={() => LoginClick()}>Login</BUTTON>
      </FORM>
      </MAIN_BACKGROUND>
    );
}

export default Super_Admin_Login