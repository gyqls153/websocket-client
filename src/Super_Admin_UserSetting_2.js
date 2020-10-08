import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSetEnableGameDic, useSelectedLoginId, useSerialInfoList, useSetSerialInfoList, useSetSelectedLoginId } from './AppContextProvider';

function Super_Admin_UserSetting_2(props)
{
    const loginId = useSelectedLoginId();

    
  const [gameList, setGameList] = useState([]);

  const [serialList, setSerialList] = useState([]);

  const [showGameList, setShowGameList] = useState(false);

  const [buyGameList, setBuyGameList] = useState({});

  const [currentSerial, set_currentSerial] = useState(0);

  
  // 시리얼 생성
  function createSerial()
  {
    axios.post('/createSerial')
    .then(function (response) {
        setSerialList([...serialList, response.data.value]);
        const temp_serialList = serialList;
        temp_serialList.push(response.data.value);
        axios.post('/updateSerialList', {
            loginId: loginId,
            serialList: temp_serialList
        }).then(function(response){ console.log(temp_serialList);})
        .catch(function(error){});        
    })
    .catch(function (error) { });
  }
  
  useEffect(() => {
      async function func(){
          await axios.post('/gameList_all', {
              loginId: loginId
          })
          .then((response) => {
              setGameList(response.data);
          })
          .catch((e) => { 
              console.log(e);
          })
      }

      async function func2(){
          await axios.post('/serial_list', {
              loginId: loginId
          })
          .then((response) => {
              console.log(response.data);
              setSerialList(response.data);
          })
          .catch((e) => { 
              console.log(e);
          })
      }

      func();
      func2();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const changeGameCheckValue = (e, data) => {
    let newBuyGameList = {};
    
    for (const key of Object.keys(buyGameList)) {
        newBuyGameList[key] = buyGameList[key];
    }

    newBuyGameList[data.id] = !newBuyGameList[data.id];
    setBuyGameList(newBuyGameList);
  }

  const onClickedInsertButton = (idx) => {
      axios.post('/buyGameList_FromSerial', {
          Serial: serialList[idx]
      })
      .then((response) => {
          set_currentSerial(serialList[idx]);
          setShowGameList(true);

        console.log(response.data);

        let newBuyGameList = {};

        for (const key of Object.keys(response.data)) {
            console.log(key);
            newBuyGameList[key] = response.data[key];
        }

        setBuyGameList(newBuyGameList);
      })
      .catch((e) => { 
          console.log(e);
      });
  }

  const onClickedRemoveButton = (idx) => {
    axios.post('/RemoveSerial', {
        Serial: serialList[idx],
        loginId
    })
    .then((response) => {
        console.log(response.data);
        setSerialList(response.data);
        setBuyGameList({});
    })
    .catch((e) => { 
        console.log(e);
    });
}






  
  const onClick_UpdateSerialSlot = () => {
    console.log(buyGameList);
      console.log(currentSerial);
      axios.post('/update_buyGameList', {
          Serial: currentSerial,
          buyGameList: buyGameList
      })
      .then(function (response) { 
      })
      .catch(function (error) { console.log(error); });
  }

  return (
      <>
        <button onClick={() => createSerial()}>시리얼생성</button>
          <p>Device 리스트</p>
          <div>
              {
                  serialList && serialList.map((data, i) => {
                      return (
                          <div key={i}>
                              <label htmlFor={"game_" + i}>{data}</label> 
                              <button onClick={(e) => onClickedInsertButton(i)}>선택</button>
                              <button onClick={(e) => onClickedRemoveButton(i)}>삭제</button>
                          </div>
                      )
                  })
              }
          </div>
          {showGameList && <div>
              <button onClick={() => {onClick_UpdateSerialSlot()}}>등록완료</button>
              <p>게임 리스트</p>
              <div>
                  {
                      gameList.map((data, i) => {
                          return (
                              <div key={i}>
                                  <label htmlFor={"game_" + i}>{data.Title}</label> 
                                  <input name={"game_" + i} checked={!!buyGameList[data.id]} onChange={(e) => changeGameCheckValue(e, data)} type="checkbox"/>
                              </div>
                          )
                      })
                  }
              </div>
              
              </div>}
         
      </>
  )
}

export default Super_Admin_UserSetting_2;