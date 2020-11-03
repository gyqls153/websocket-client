import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelectedSerial, useSerialInfoList } from './AppContextProvider';

function Admin_Setting_Game_Selection(props)
{
    const NANUM_GOTHIC_1 = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: black;
    text-align: center;
    margin: 0px;
    `

    const NANUM_GOTHIC_2 = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    text-align: center;
    margin: 0px;
    `

    const HEADER = styled.div`
    background-color: black;
    height: 100px;
    `

    const MAIN_BACKGROUND = styled.div`
    background-color: white;
    height: 100vh;
    `

    const BUTTON = styled.button`
        background-color: white;
        border: 1px solid;
        height: 30px;
        width: 100px;
    `

    const MAIN_DIV = styled.div`
    display: flex;
    flex-direction: column;
    `

    const CATEGORY_BUTTONS = styled.div`
    display: flex;
    `

    const [all_gameList, set_all_gameList] = useState([]);
    const [disable_games, set_disable_games] = useState([]);

    const singleGameList = () => {
        all_gameList.forEach(
            function(data) {
                if (!disable_games.includes(data.id))
                {
                    if (data.Single === 1)
                    {

                    }
                }
            }
        )
    };

    const multiGameList = () => {
        all_gameList.forEach(
            function(data) {
                if (!disable_games.includes(data.id))
                {
                    if (data.Multi === 1)
                    {

                    }
                }
            }
        )
    };

    const collaborationGameList = () => {
        all_gameList.forEach(
            function(data) {
                if (!disable_games.includes(data.id))
                {
                    if (data.Collaboration === 1)
                    {
                        
                    }
                }
            }
        )
    };

    const fitnessGameList = () => {
        all_gameList.forEach(
            function(data) {
                if (!disable_games.includes(data.id))
                {
                    if (data.Fitness === 1)
                    {
                        
                    }
                }
            }
        )
    };

    const contentAPI = [
        {
          tab: "싱글플레이",
          content: ""
        },
        {
          tab: "멀티플레이",
          content: "i am the content of the section2"
        },
        {
          tab: "협동플레이",
          content: "i am the content of the section3"
        },
        {
          tab: "피티니스",
          content: "i am the content of the section4"
        }
      ];
      
      const useTab = (initialTab, allTabs) => {
        const [currentIndex, setCurrentIndex] = useState(initialTab);
        return {
          currentItem: allTabs[currentIndex],
          changeItem: setCurrentIndex
        };
      };
      
      const currentSerial = useSelectedSerial();

      useEffect(() =>{
        axios.post('/get_gamelist_all', {
          })
            .then((response) => {
                console.log(response);
                set_all_gameList(response);
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
    const { currentItem, changeItem } = useTab(0, contentAPI);
    return (
    <MAIN_DIV>
    <HEADER>
        <NANUM_GOTHIC_1>Game Selection</NANUM_GOTHIC_1>
    </HEADER>
    <CATEGORY_BUTTONS>
        {contentAPI.map((section, index) => (
          // changeItem(index) 을 onClick에 그대로 받으면
          // 함수가 즉시 실행되기 때문에
          // 익명 함수로 changeItem(index)를 전달한다
          <BUTTON key={index} onClick={() => changeItem(index)}><NANUM_GOTHIC_1>{section.tab}</NANUM_GOTHIC_1></BUTTON>
        ))}
    </CATEGORY_BUTTONS>
        {/* contentAPI 배열의 currentItem 번째의 content 내용이 찍힌다 */}
        <div>{currentItem.content}</div>
    </MAIN_DIV>
  );
}

export default Admin_Setting_Game_Selection;