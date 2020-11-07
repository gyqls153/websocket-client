
import styled from 'styled-components'
import React from 'react';

const TemplateStyle = styled.div`
    background-color: white;
    margin-left: 5%;
    margin-right: 5%;
    border-radius: 15px;
    margin-bottom: 10px;
    position: relative;
    height: 40px;
`;

const IconeButton = styled.img`
    position: relative;
    width: 30px;
    height: 30px;
    left: 10px;
    top: 5px;
`;

const RemoveButton = styled.img`
    position: absolute;
    width: 30px;
    height: 30px;
    right: 10px;
    top: 5px;
`;

const TextWrap = styled.div`
   position: relative;
   top: -20px;
   left: 50px;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
`;

function Super_Admin_Manage_Customer(props) {

    function onRemoveButtonClick(id) {
        console.log("clicked");
        /* eslint no-restricted-globals:0 */
        const result = confirm("등록 정보를 삭제하시겠습니까?");
        if (result) {
            props.removeFunc(id)
        }
        else {

        }
    }

    console.log(props);

    return(
        <TemplateStyle onClick={() => props.onClick()}>  
            <IconeButton src="Common/List_icon1.png"></IconeButton>
            <TextWrap>{props.customerName}</TextWrap>
            <RemoveButton onClick={(e) => {onRemoveButtonClick(props.id); e.stopPropagation();}} src="Common/Remove_Button.png"></RemoveButton>
        </TemplateStyle>
    );
}

export default Super_Admin_Manage_Customer;