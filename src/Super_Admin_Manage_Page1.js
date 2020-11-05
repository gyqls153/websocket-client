
import styled from 'styled-components'
import React, {useEffect, useState} from 'react';
import Super_Admin_Manage_Customer from './Super_Admin_Manage_Customer';
import axios from 'axios';

import AppContextProvider, {
  useAdminInfo_List,
  useName,
  useAddAdminInfo,
  useSetSelectedLoginId,
  useSetSerialInfoList,
  useSetEnableGameDic,
  useSetAdminLoginId,
  useSetCurrentCustomer,
} from './AppContextProvider';

const HEADER = styled.div`
    background-color: red;
    height: 70px;
`;

  const LOGO = styled.img`
  width: 100px;
  position: absolute; 
  left: 50%; transform: translateX(-50%);
  top: 10px;
  `

const NANUM_GOTHIC = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: black;
    text-align: center;
    margin: 0px;
    `

const MAINBACKGROUND = styled.div`
`;

  const ADDBUTTON = styled.img`
    margin-left: 40%;
    width: 20%;
`;

function Super_Admin_Manage_Page1(props) {

    const [adminInfoList, setAdminInfoList] = useState([]);

    async function func() {
      await axios.post('/admin_user_info_all', {}).then(function (response) {
          console.log(response.data);
          setAdminInfoList(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  async function removeAdminUser(id) {
        console.log("removeAdminUser")

      await axios.post('/remove_admin_user', {
          id
      }).then(function (response) {
        console.log("removeAdminUser_then")
          console.log(response.data);
          setAdminInfoList(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
  func();

}, []);


const setCurrentCustomer = useSetCurrentCustomer();
  let setSelectedLoginId = useSetSelectedLoginId();
  
  async function Clicked_Customer(id) {
    setSelectedLoginId(id);
    await axios.post('/get_admin_Info', { loginId:id }).then(function (response) {
      console.log(response.data);
      setCurrentCustomer(response.data.name);
      props.history.push("super_admin_manage_page3");
    })
  }

    const fruitsList = adminInfoList.map(
    (data) => (<Super_Admin_Manage_Customer onClick={() => Clicked_Customer(data.loginId) } key={data.name} customerName={data.name} removeFunc={() => removeAdminUser(data.id)}></Super_Admin_Manage_Customer>)
    );

    return(
        <>
            <HEADER>
                <LOGO src="Super_Admin/Login_Logo.png"></LOGO>
            </HEADER>
            <MAINBACKGROUND>
            <ADDBUTTON onClick={() => {props.history.push("super_admin_create_account")}} src="Common/Add_Button.png"></ADDBUTTON>
              {fruitsList}                
            </MAINBACKGROUND>
        </>
    );
}

export default Super_Admin_Manage_Page1;