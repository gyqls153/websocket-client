
import styled from 'styled-components'
import React from 'react';
import Super_Admin_Manage_Customer from './Super_Admin_Manage_Customer';


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

  const ADDBUTTON = styled.img`
    margin-left: 40%;
    width: 20%;
`;

function Super_Admin_Manage_Page1(props) {
    const fruits = ['사과','배','바나나','포도','수박'];
    const fruitsList = fruits.map(
    (fruit) => (<Super_Admin_Manage_Customer customerName={fruit}></Super_Admin_Manage_Customer>)
    );


    return(
        <>
            <HEADER>
                <LOGO src="Super_Admin/Login_Logo.png"></LOGO>
            </HEADER>
            <MAINBACKGROUND>
            <ADDBUTTON src="Common/Add_Button.png"></ADDBUTTON>
              {fruitsList}                
            </MAINBACKGROUND>
        </>
    );
}

export default Super_Admin_Manage_Page1;