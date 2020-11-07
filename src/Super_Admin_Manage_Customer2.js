
import React from 'react';
import styled from 'styled-components';

const TemplateStyle = styled.div`
    background-color: white;
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 15px;
    margin-bottom: 10px;
    position: relative;
    height: 50px;
`;
const IconeButton = styled.img`
    position: relative;
    width: 30px;
    height: 30px;
    left: 10px;
    top: 10px;
`;

const RemoveButton = styled.img`
    position: relative;
    width: 30px;
    height: 30px;
    left: 330px;
    top: -55px;
`;

const TextMain = styled.div`
    position: relative;
    font-size: 16px;
    top: -20px;
    left: 50px;

    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
`;

const TextMain2 = styled.div`
    position: relative;
    font-size: 10px;
    top: -20px;
    left: 50px;
    color: gray;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
`;

function Super_Admin_Manage_Customer2(props) {

    function onRemoveButtonClick(id) {
        console.log("clicked");
        /* eslint no-restricted-globals:0 */
        const result = confirm("등록 제품을 삭제하시겠습니까?");
        if (result) {
            props.removeFunc(id)
        }
        else {

        }
    }

    return(
        <TemplateStyle>  
            <IconeButton src="Common/List_icon2.png"></IconeButton>
            <TextMain>{props.customerName}</TextMain>
            <TextMain2>{props.serial}</TextMain2>
            <RemoveButton src="Common/Remove_Button.png" onClick={() => onRemoveButtonClick(props.id)}></RemoveButton>
        </TemplateStyle>
    );
}

export default Super_Admin_Manage_Customer2;