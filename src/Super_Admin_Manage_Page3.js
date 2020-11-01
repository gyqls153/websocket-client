
import styled from 'styled-components'
import React from 'react';
import Super_Admin_Manage_Customer2 from './Super_Admin_Manage_Customer2';

import { useCurrentCustomer, useSetCurrentCustomer } from './AppContextProvider'


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

const TOP = styled.div`
    padding-top: 30px;
`;

const NANUM_GOTHIC = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    text-align: center;
    margin: 0px;
    color: white;
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

const MAINGAP = styled.div`
    height: 10px;
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

function Super_Admin_Manage_Page3(props) {
    const fruits = ['사과','배','바나나','포도','수박'];
    const fruitsList = fruits.map(
    (fruit) => (<Super_Admin_Manage_Customer2 customerName={fruit} serial="dsfdsfdsfdsfdsfds-dsfdsfdsfdsfds-dsfdsfdsffsdf"></Super_Admin_Manage_Customer2>)
    );

    const setCurrentCustomer = useSetCurrentCustomer();
    setCurrentCustomer("안동초등학교");
    const currentCustomer = useCurrentCustomer();

    return(
        <>
            <HEADER>
                <TOP><NANUM_GOTHIC>{currentCustomer}</NANUM_GOTHIC></TOP>
            </HEADER>
            <MAINBACKGROUND>
                <MAINGAP/>
                    {fruitsList}
            </MAINBACKGROUND>
        </>
    );
}

export default Super_Admin_Manage_Page3;