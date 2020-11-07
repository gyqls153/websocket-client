
import React from 'react';
import styled from 'styled-components';

const TemplateStyle = styled.div`
    position: relative;
    height: 60px;
`;

const IconeButton = styled.img`
    position: absolute;
    top: 10px;
    left: 15px;
    width: 40px;
    height: 40px;
`;

const TextMain = styled.p`
    font-size: 20px;
    position: absolute;
    top: -7px;
    left: 60px;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
`;

const TextMain2 = styled.p`
    font-size: 10px;
    color: gray;
    position: relative;
    left: 60px;
    top: 35px;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
`;


const Line = styled.hr`
    width: 100vw;
`;

function Super_Admin_Manage_Customer3(props) {
    return(
        <div>
        <TemplateStyle onClick={() => props.onClick()}>  
            <IconeButton src="Common/List_icon2.png"></IconeButton>
            <TextMain>{props.customerName}</TextMain>
            <TextMain2>{props.serial}</TextMain2>
        </TemplateStyle>
        <Line></Line>
        </div>
        
    );
}

export default Super_Admin_Manage_Customer3;