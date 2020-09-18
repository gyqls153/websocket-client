import React from 'react';
import ws from './WebSocket';
import axios from 'axios';

function Home(props)
{
    console.log(props);

    const login = () => {
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    axios.post('/admin_login', {
      id : id,
      password : password
    })
    .then(function (response) { 
      if (response.data.isSuccess)
      {
        alert("로그인 성공");
        props.history.push("/admin_main");
      }
      else
      {
        alert(response.data.errorMsg);
      }
      console.log(response);
    })
    .catch(function (error) { });
}

  return(
        <div className="App-Admin-Join">
          <div>
            <label>ID</label>
            <input type="text" id="id" />
          </div>
          <div>
            <label>PASSWORD</label>
            <input type="password" id="password" />
          </div>
          <button onClick= {login}>로그인</button>
        </div>
  ); 
}

export default Home;