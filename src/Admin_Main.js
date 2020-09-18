import React from 'react';
import ws from './WebSocket';
import axios from 'axios';

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

function Admin_Main() {
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
        </div>
    );
};

export default Admin_Main;