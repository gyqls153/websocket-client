import React, { useContext, useEffect, useState } from 'react';
import ws from './WebSocket';
import axios from 'axios';
import AppContextProvider, { useAdminInfo_List, useName, useAddAdminInfo } from './AppContextProvider';

function joinAdminUser()
{
  const id = document.getElementById("id").value;
  const password = document.getElementById("password").value;
  const password_verify = document.getElementById("password_verify").value;

  if (password !== password_verify)
  {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  axios.post('/admin_join', {
    id : id,
    password : password
  })
  .then(function (response) { 
    if (response.data.isSuccess)
    {
      alert("등록 성공") 
    }
    else
    {
      alert(response.data.errorMsg);
    }
    console.log(response);
  })
  .catch(function (error) { });
}

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

function Super_Admin_Main() {
    const name = useName();
    
    const [adminInfoList_recv, setAdminInfoList_recv] = useState(false);
    const [adminInfoList, setAdminInfoList] = useState([]);

    useEffect(() => {
        async function func(){
        await axios.post('/adminInfo_list', {
        })
        .then(function (response) { 

          let temp_adminInfoList = adminInfoList;
          temp_adminInfoList = temp_adminInfoList.concat(response.data);

           if (!adminInfoList_recv)
             setAdminInfoList(temp_adminInfoList);
             setAdminInfoList_recv(true);             
        })
        .catch(function (error) { console.log(error); });

      }

      func();

    }, [adminInfoList, adminInfoList_recv]);
    return (
        <div className="App-Admin-Join">
          <div>
            <label>ID</label>
            <input type="text" id="id" />
          </div>
          <div>
            <label>PASSWORD</label>
            <input type="password" id="password" />
          </div>
          <div>
            <label>PASSWORD_VERIFY</label>
            <input type="password" id="password_verify" />
          </div>
          <button onClick= {joinAdminUser}>관리자 등록</button>
          <input type='text' required = {true} readOnly = {true} value="" id="serialTextBox"></input>
          <button onClick= {createSerial}>시리얼 생성</button>
          <table>
            <tbody>
            {
                adminInfoList.length > 0 && adminInfoList.map((data, i)=> {
                  console.log(data);
                  return (<tr key={i}>
                    <td>{data.loginId}</td>
                    <td><button>수정</button></td>
                  </tr>)
                })
            }
          </tbody>
          </table>
        </div>
    );
};

export default Super_Admin_Main;