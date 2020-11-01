
import styled from 'styled-components'
import React from 'react';

const TemplateStyle = styled.div`
    background-color: white;
    width: 40%;
    margin-left: 30%;
    margin-right: 30%;
    border-radius: 15px;
    margin-bottom: 10px;
`;

const IconeButton = styled.img`
    margin-top: 5px;
    margin-left: 20px;
    width: 30px;
`;

const RemoveButton = styled.img`
    margin-top: 5px;
    float: right;
    width: 30px;
    margin-right: 20px;
`;

function Super_Admin_Manage_Customer2(props) {
    return(
        <TemplateStyle>  
            <IconeButton src="Common/List_icon2.png"></IconeButton>
            <span>{props.customerName}</span>
            <RemoveButton src="Common/List_icon1.png"></RemoveButton>
        </TemplateStyle>
    );
}

export default Super_Admin_Manage_Customer2;