import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useEnableGameDic, useSelectedLoginId, useSerialInfoList, useSetSerialInfoList } from './AppContextProvider';
import styled from 'styled-components'

const di = styled.div`
background-color : #CD282D;
`;

function Super_Admin_UserSetting_1(props)
{
  const serialInfoList = useSerialInfoList();
  const setSerialInfoList = useSetSerialInfoList();
  const loginId = useSelectedLoginId();

    // 시리얼 생성
  function createSerial()
  {
    axios.post('/createSerial')
    .then(function (response) { 
      setSerialInfoList([...serialInfoList, response.data.value]);
    })
    .catch(function (error) { });
  }

  const enableGameDic = useEnableGameDic();

  const onClick_UpdateSerialSlot = () => {
      axios.post('/update_gameInfo', {
         loginId: loginId,
         serials: JSON.stringify(serialInfoList),
         enableGameDic: JSON.stringify(enableGameDic)
      })
      .then(function (response) { 
      })
      .catch(function (error) { console.log(error); });
  }
  
  const onClick_AddSerialSlot = () => {
    console.log(serialInfoList);
    setSerialInfoList([...serialInfoList,""]);
  }

  const onClick_RemoveSerialSlot = (i) => {
        console.log(i);
        serialInfoList.splice(i, 1);
        setSerialInfoList([...serialInfoList]);
    }

    console.log(serialInfoList);

    const menuList = serialInfoList && serialInfoList.map((menu, index, array) => (<div key={index}>
      <span>{menu}</span>
      <button onClick={e => onClick_RemoveSerialSlot(index)}>삭제</button>
    </div>));

    return (
        <>
            <div>
                <di></di>
                <button onClick= {createSerial}>시리얼 생성</button>
                <button onClick= {onClick_UpdateSerialSlot}>등록완료</button>
            </div>
            {menuList}
        </>
    )
}


export default Super_Admin_UserSetting_1;