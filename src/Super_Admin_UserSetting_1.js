import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useEnableGameDic, useSelectedLoginId, useSerialInfoList, useSetSerialInfoList } from './AppContextProvider';

function Super_Admin_UserSetting_1(props)
{
    // 시리얼 생성
  function createSerial()
  {
    axios.post('/createSerial')
    .then(function (response) { 
      console.log(response); 
      const textBox = document.getElementById("serialTextBox");
      textBox.value = response.data.value;
    })
    .catch(function (error) { });
  }

  const [serialList_recv, setSerialList_recv] = useState(false);
  const serialInfoList = useSerialInfoList();
  const setSerialInfoList = useSetSerialInfoList();
  const loginId = useSelectedLoginId();

  const onClickAddButton = (serial) => {
    axios.post('/add_Serial', {
        loginId : loginId,
        serial : serial
      })
      .then(function (response) { 
        if (response.data.isSuccess)
        {
          alert("등록 성공") 
          setSerialList_recv(false);
        }
        else
        {
          alert(response.data.errorMsg);
        }
        console.log(response);
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

  const onChange_SerialValue= (idx, value) => {
    serialInfoList[idx] = value;
  }


  const onClick_RemoveSerialSlot = (i) => {
        console.log(i);
        serialInfoList.splice(i, 1);
        setSerialInfoList([...serialInfoList]);
    }

    console.log(serialInfoList);

    const menuList = serialInfoList.map((menu, index) => (<div key={index}>
        <div>{menu}</div>
    <button onClick={e => onClick_RemoveSerialSlot(index)}>{"test"+`${index}`}</button>
      </div>));

    return (
        <>
            <div>
                <input type='text' required = {true} readOnly = {true} value="" name="serialTextBox_Group" id="serialTextBox"></input>
                <button onClick= {createSerial}>시리얼 생성</button>
            </div>
            <div>
                <button onClick={() => {onClick_AddSerialSlot()}}>+</button>
                <button onClick={() => {onClick_UpdateSerialSlot()}}>등록완료</button>
            </div>
            {menuList}
        </>
    )
}


export default Super_Admin_UserSetting_1;