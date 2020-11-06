
import React from 'react';
import styled from 'styled-components';

const TemplateStyle = styled.div`
    display: flex;
    justify-content: space-between;
`;

const IconeButton = styled.img`
    margin-top: 5px;
    margin-left: 20px;
    width: 30px;
    height: 30px;
`;

const ToggleButton = styled.img`
    margin-top: 15px;
    margin-bottom: 5px;
    margin-right: 20px;
    width: 30px;
    height: 15px;
    justify-self: flex-end;
`;

const TextMain = styled.p`
    font-size: 10px;
    margin-top: 0px;
    margin-bottom: 0px;
`;

const TextMain2 = styled.p`
    font-size: 6px;
    margin-top: 0px;
    margin-bottom: 0px;
    color: gray;
    
    margin-left: 0px;
`;

const TextWrap = styled.div`
    margin-top: 10px;
    margin-bottom: 0px;
    
    margin-left: 10px;
`;

const Mini_TemplateStyle = styled.div`
    display: flex;
`;


const Line = styled.hr`
    width: 100vw;
`;

function Admin_Game_Box(props) {
    console.log(props.Icon);
    return(
        <>
        <TemplateStyle>  
            <Mini_TemplateStyle><IconeButton src={"Icon_Con00/"+ props.Icon}></IconeButton>
            <TextWrap><TextMain>{props.Title}</TextMain><TextMain2>{props.Desc}</TextMain2></TextWrap>
            </Mini_TemplateStyle>
            <ToggleButton onClick={() => props.SetEnable()} src={props.Enable ? "Remote/Btn_On.PNG" : "Remote/Btn_Off.PNG"}></ToggleButton>
        </TemplateStyle>
        <Line></Line>
        </>
    );
}

export default Admin_Game_Box;