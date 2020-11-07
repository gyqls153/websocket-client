import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelectedSerial, useSerialInfoList } from './AppContextProvider';
import Admin_Game_Box from './Admin_Game_Box';

function Admin_Setting_Game_Selection(props)
{
    const BACK_BUTTON = styled.img`
    width: 20px;
    height: 30px;
    position: absolute;
    top: 25px;
    left: 15px;
    `

    const NANUM_GOTHIC = styled.span`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    position: absolute;
    top: 35%;
    left: 50%;
    transform:translateX(-50%);
    font-size: 25px;
    font-weight: bold;
    `

    const NANUM_GOTHIC_2 = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: black;
    text-align: center;
    margin: 0px;
    font-size: 17px;
    `

    const BACKBUTTON = styled.img`
    width: 20px;
    margin-left: 10px;
    margin-top: 10px;
    display: inline;
    `
   
   const NANUM_GOTHIC_3 = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    text-align: center;
    margin: 0px;
    `

    const HEADER = styled.div`
    width: 100%;
    height: 80px;
    background-color: black;
    position: relative;
    `

    const MAIN_BACKGROUND = styled.div`
    `

    const BUTTON = styled.button`
        background-color: white;
        border: 0px solid;
        height: 50px;
        width: 25%;
        position: relative;
    `

    const LINE = styled.hr`
        width: 100%;    
        position: absolute;
        bottom: 0px;
        margin-bottom: 0px;
        border: solid 1px gray;
    `;
    
    const MAIN_DIV = styled.div`
    display: flex;
    flex-direction: column;
    `

    const CATEGORY_BUTTONS = styled.div`
    display: flex;
    `

    let [all_gameList, set_all_gameList] = useState({});
    let [disable_games, set_disable_games] = useState([]);

    let test = []

    const singleGameList = () => {
        let result = [];
        for(let i = 0; i < all_gameList.length; ++i) {
            const data = all_gameList[i];
                if (disable_games[data.id])
                {
                    data.Enable = false;
                    
                    console.log("D" + data.id + ' ' + data.Enable);
                    result.push(data);
                }
                else
                {
                    if (data.Single === 1)
                    {
                        console.log("E");
                        data.Enable = true;
                        result.push(data);
                    }
                }
        }

        return result;
    };

    const multiGameList = () => {
        let result = [];
        for(let i = 0; i < all_gameList.length; ++i) {
            const data = all_gameList[i];
                if (!disable_games[data.id])
                {
                    if (data.Multi === 1)
                    {
                        data.Enable = true;
                        result.push(data);
                    }
                }
                else
                {
                    data.Enable = false;
                    result.push(data);
                }
            }
        
        
        return result;
    };

    const collaborationGameList = () => {
        let result = [];
        for(let i = 0; i < all_gameList.length; ++i) {
            const data = all_gameList[i];
                if (!disable_games[data.id])
                {
                    if (data.Collaboration === 1)
                    {
                        data.Enable = true;
                        result.push(data);
                    }
                }
                else
                {
                    data.Enable = false;
                    result.push(data);
                }
            }
        
        return result;
    };

    const fitnessGameList = () => {
        let result = [];
        for(let i = 0; i < all_gameList.length; ++i) {
            const data = all_gameList[i];
                if (!disable_games[data.id])
                {
                    if (data.Fitness === 1)
                    {
                        data.Enable = true;
                        result.push(data);
                    }
                }
                else
                {
                    data.Enable = false;
                    result.push(data);
                }
            }   
        return result;
    };

    const currentSerial = useSelectedSerial();

    const SetEnable = (isEnable, gameId) => {
        console.log(isEnable);
        axios.post('/set_enableGame', {
            isEnable,
            gameId,
            serial: currentSerial
        })
          .then((response) => {
              console.log("응답 받음")
              console.log(response.data)
              set_disable_games(response.data);
          })
          .catch((e) => {
              console.log('에러남');
          });
    }

    const contentAPI = [
        {
          tab: "싱글플레이",
          content: singleGameList().map((data) => (<Admin_Game_Box key={data.id} SetEnable={() => {console.log(data); SetEnable(!data.Enable, data.id)}} Enable={data.Enable} id={data.id} Title={data.Title} Icon={data.Icon} Desc={data.Desc} />))
        },
        {
          tab: "멀티플레이",
          content: multiGameList().map((data) => (<Admin_Game_Box key={data.id} SetEnable={() => {console.log(data.Enable); SetEnable(!data.Enable, data.id)}} Enable={data.Enable} id={data.id} Title={data.Title} Icon={data.Icon} Desc={data.Desc} />))
        },
        {
          tab: "협동플레이",
          content: collaborationGameList().map((data) => (<Admin_Game_Box key={data.id} SetEnable={() => {console.log(data.Enable); SetEnable(!data.Enable, data.id)}} Enable={data.Enable} id={data.id} Title={data.Title} Icon={data.Icon} Desc={data.Desc} />))
        },
        {
          tab: "피티니스",
          content: fitnessGameList().map((data) => (<Admin_Game_Box key={data.id} SetEnable={() => {console.log(data.Enable); SetEnable(!data.Enable, data.id)}} Enable={data.Enable} id={data.id} Title={data.Title} Icon={data.Icon} Desc={data.Desc} />))
        }
      ];
      
      const useTab = (initialTab, allTabs) => {
        const [currentIndex, setCurrentIndex] = useState(initialTab);
        return {
          currentItem: allTabs[currentIndex],
          changeItem: setCurrentIndex,
          currentIndex
        };
      };
      
      console.log(contentAPI[0]);

      useEffect(() =>{
        axios.post('/get_gamelist_all', {
          })
            .then((response) => {
                console.log(response);
                set_all_gameList(response.data);
                axios.post('/get_disable_game_list', {
                    serial: currentSerial
                })
                  .then((response_2) => {
                    console.log(response_2);
                    set_disable_games(response_2.data);
                  })
                  .catch((e) => {
                  });
            })
            .catch((e) => {
            });
      },[])

    const { currentItem, changeItem, currentIndex } = useTab(0, contentAPI);
    return (
    <MAIN_DIV>
    <HEADER>
          <BACK_BUTTON src= "Remote/Btn_BackArrow.PNG" onClick={() => props.history.goBack()}></BACK_BUTTON>
          <NANUM_GOTHIC>Game Selection</NANUM_GOTHIC>
        </HEADER>
    <MAIN_BACKGROUND>
    <CATEGORY_BUTTONS>
        {contentAPI.map((section, index) => {
          // changeItem(index) 을 onClick에 그대로 받으면
          // 함수가 즉시 실행되기 때문에
          // 익명 함수로 changeItem(index)를 전달한다
        let result = <BUTTON key={index} onClick={() => changeItem(index)}><NANUM_GOTHIC_2>{section.tab}</NANUM_GOTHIC_2>{currentIndex === index ? <LINE></LINE> : <></>}</BUTTON>;

          return result;
        })}
    </CATEGORY_BUTTONS>
        {/* contentAPI 배열의 currentItem 번째의 content 내용이 찍힌다 */}
        <div>{currentItem.content}</div>
    </MAIN_BACKGROUND>
    </MAIN_DIV>
  );
}

export default Admin_Setting_Game_Selection;