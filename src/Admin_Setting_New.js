import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

function Admin_Setting_New(props)
{
    const HEADER = styled.div`
    background-color: black;
    height: 70px;
    `;
        
    const NANUM_GOTHIC = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    text-align: center;
    margin: 0px;
    padding-top: 25px;
    `
    
    return (
        <>
            <HEADER>
                <NANUM_GOTHIC>구매 제품 목록</NANUM_GOTHIC>
            </HEADER>
        </>
    )
}

export default Admin_Setting_New;