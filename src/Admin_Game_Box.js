
import React from 'react';
import styled from 'styled-components';

const TemplateStyle = styled.div`
    position: relative;
    height: 80px;
`;

const IconeButton = styled.img`
    position: relative;
    width: 50px;
    height: 50px;
    left: 10px;
    top: 15px;
`;

const ToggleButton = styled.img`
    width: 60px;
    height: 30px;
    position: absolute;
    top: 35px;
    right: 10px;
`;

const TextMain = styled.p`
    font-size: 17px;
    position: absolute;
    left: 75px;
    top: 10px;
    
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
`;

const TextMain2 = styled.p`
    font-size: 13px;
    position: absolute;
    left: 75px;
    top: 35px;
    color: gray;
    width: 240px;
    
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    
    margin-left: 0px;
`;

const Line = styled.hr`
    width: 100vw;
    position: relative;
`;

function Admin_Game_Box(props) {
    console.log(props.Icon);
    return(
        <>
        <TemplateStyle>  
            <IconeButton src={"Icon_Con00/"+ props.Icon}></IconeButton>
            <TextMain>{props.Title}</TextMain>
            <TextMain2>{props.Desc}</TextMain2> 
            <ToggleButton onClick={() => props.SetEnable()} src={props.Enable ? "Remote/Btn_On.PNG" : "Remote/Btn_Off.PNG"}></ToggleButton>
        </TemplateStyle>
        <Line></Line>
        </>
    );
}

export default Admin_Game_Box;