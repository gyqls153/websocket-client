import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelectedLoginId } from './AppContextProvider';

function Super_Admin_UserSetting(props)
{
    // 시리얼 생성
  function createSerial()
  {
    axios.get('/createSerial')
    .then(function (response) { 
      console.log(response); 
      const textBox = document.getElementById("serialTextBox");
      textBox.value = response.data.value;
    })
    .catch(function (error) { });
  }

  const [serialList_recv, setSerialList_recv] = useState(false);
  const [serialInfoList, setSerialInfoList] = useState([]);
  const loginId = useSelectedLoginId();

  useEffect(() => {
      async function func(){
      await axios.post('/serial_list', {
          loginId: loginId
      })
      .then(function (response) { 

        console.log(response.data);

         if (!serialList_recv)
            setSerialInfoList(response.data);
           setSerialList_recv(true);
      })
      .catch(function (error) { console.log(error); });

    }

    func();

  }, [serialInfoList, serialList_recv]);

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

  const onClick_AddSerialSlot = () => {
      console.log(serialInfoList);
      setSerialInfoList([...serialInfoList,""]);
  }

  const onChange_SerialValue= (idx, value) => {
    serialInfoList[idx] = value.target.value;
  }

  const onClick_UpdateSerialSlot = () => {

        console.log(serialInfoList);

      axios.post('/update_serial_list', {
         loginId: loginId,
         serials: JSON.stringify(serialInfoList)
      })
      .then(function (response) { 
        console.log(response.data); 

         if (!serialList_recv)
            setSerialInfoList(response.data.serials);
           setSerialList_recv(true);
      })
      .catch(function (error) { console.log(error); });

  }


  const onClick_RemoveSerialSlot = (i) => {
        serialInfoList.splice(i, 1);
        setSerialInfoList([...serialInfoList]);
    }

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
            <div>
                <table>
                    <tbody>
                    {
                        serialInfoList != null && serialInfoList.length > 0 && serialInfoList.map((data, i)=> {
                        return (<tr key={i}>
                            <td><input onChange={(value) => {onChange_SerialValue(i, value);  console.log(data);} } type='text' required = {true} defaultValue = {data} id={`"serialTextBox_${i}"`}></input></td>
                            <td><button onClick={() => onClick_RemoveSerialSlot(i)}>삭제</button></td>
                        </tr>)
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default Super_Admin_UserSetting;