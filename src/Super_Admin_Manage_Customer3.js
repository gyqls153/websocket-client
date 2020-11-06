
import React from 'react';
import styled from 'styled-components';

const TemplateStyle = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: left;
`;

const IconeButton = styled.img`
    margin-top: 5px;
    margin-left: 20px;
    margin-right: 30px;
    width: 30px;
    height: 30px;
`;

const RemoveButton = styled.img`
    margin-top: 5px;
    margin-bottom: 5px;
    margin-right: 20px;
    width: 30px;
    height: 30px;
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
`;

const TextWrap = styled.div`
    margin-top: 10px;
    margin-bottom: 0px;
`;

const Line = styled.hr`
    width: 500px;
`;

function Super_Admin_Manage_Customer3(props) {
    return(
        <div>
        <TemplateStyle onClick={() => props.onClick()}>  
            <IconeButton src="Common/List_icon2.png"></IconeButton>
            <TextWrap><TextMain>{props.customerName}</TextMain><TextMain2>{props.serial}</TextMain2></TextWrap>
        </TemplateStyle>
        <Line></Line>
        </div>
        
    );
}

export default Super_Admin_Manage_Customer3;