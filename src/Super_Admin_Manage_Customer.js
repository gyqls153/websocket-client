
import styled from 'styled-components'
import React from 'react';

const TemplateStyle = styled.div`
    background-color: white;
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 15px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between 
`;

const IconeButton = styled.img`
    margin-top: 2px;
    margin-left: 20px;
    width: 30px;
    height: 30px;
`;

const RemoveButton = styled.img`
    margin-top: 2px;
    float: right;
    width: 30px;
    height: 30px;
    margin-right: 20px;
`;

const TextWrap = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
`;

function Super_Admin_Manage_Customer(props) {
    return(
        <TemplateStyle>  
            <IconeButton src="Common/List_icon1.png"></IconeButton>
            <TextWrap>{props.customerName}</TextWrap>
            <RemoveButton src="Common/Remove_Button.png"></RemoveButton>
        </TemplateStyle>
    );
}

export default Super_Admin_Manage_Customer;