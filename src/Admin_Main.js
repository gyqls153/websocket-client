import React, { useContext, useEffect, useState } from 'react';
import ws from './WebSocket';
import axios from 'axios';
import AppContextProvider, { useAdminInfo_List, useName, useAddAdminInfo, useSetSelectedLoginId, useSetSerialInfoList, useSetEnableGameDic, useSetAdminLoginId } from './AppContextProvider';

function Admin_Main(props) {
  
  const setAdminLoginId = useSetAdminLoginId();

  function joinAdminUser()
  {
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    axios.post('/admin_login', {
      loginId : id,
      password : password
    })
    .then(function (response) { 
      if (response.data.isSuccess)
      {
        setAdminLoginId(id);
        // 로그인
        props.history.push("/admin_setting");
      }
      else
      {
        alert(response.data.errorMsg);
      }
      console.log(response);
    })
    .catch(function (error) { });
  }
  
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
          <button onClick= {joinAdminUser}>로그인</button>
        </div>
    );
};

export default Admin_Main;