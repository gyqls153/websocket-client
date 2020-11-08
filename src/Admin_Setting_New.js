import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useAdminLoginId, useSetSelectedSerial, useSetSelectedSerialName } from './AppContextProvider';
import Axios from 'axios';

import Super_Admin_Manage_Customer3 from './Super_Admin_Manage_Customer3';

const MAINBACKGROUND = styled.div`
`;

const MAINGAP = styled.div`
    height: 10px;
`;

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
    font-size: 20px;
    font-weight: bold;
    `
    
    const loginId = window.sessionStorage.getItem("loginId");

    const [serials, setSerialList] = useState([]);

    useEffect(() => {
        async function func2() {
          await Axios.post('/serial_list', {
            loginId: loginId,
          })
            .then((response) => {
              console.log(response.data);
              setSerialList(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
    
        func2();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    
        return () => {
        } 
      }, []);

  async function Clicked_Serial(serial, dataName) {
    window.sessionStorage.setItem("selectedSerial", serial);
    window.sessionStorage.setItem("selectedSerialName", dataName);

    await Axios.post('/callback').then(function (response) {
        props.history.push("admin_setting_selected_device");
    })
  }

    const zeroPad = (num, places) => String(num).padStart(places, '0');
    let idx = 0;
      let dataList = serials.map(
        (data) => {    
        idx ++;
        
        const dataName = "SPark " + zeroPad(idx,2);
        console.log(dataName);
    
        return <Super_Admin_Manage_Customer3 key = {data} customerName={dataName} serial={data} onClick={() => Clicked_Serial(data, dataName) }></Super_Admin_Manage_Customer3>
        }
        );
        
    return (
        <>
            <HEADER>
                <NANUM_GOTHIC>구매 제품 목록</NANUM_GOTHIC>
            </HEADER>
            <MAINBACKGROUND>
                {dataList}
            </MAINBACKGROUND>
        </>
    )
}

export default Admin_Setting_New;