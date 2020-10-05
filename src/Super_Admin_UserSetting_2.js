import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useEnableGameDic, useSelectedLoginId } from './AppContextProvider';

function Super_Admin_UserSetting_2(props)
{
    const [packet_recv, set_packet_recv] = useState(false);
    const [gameList, setGameList] = useState([]);
    const enableGameDic = useEnableGameDic();

    useEffect(() => {
        async function func(){
            await axios.post('/gameList_all', {})
            .then((response) => {
                if (!packet_recv)
                {
                    setGameList(response.data);
                    set_packet_recv(true);
                }
            })
            .catch((e) => { 
                
            })
        }

        func();
    },[packet_recv, gameList]);
    
    const changeGameCheckValue = (e, data) => {
        enableGameDic[data.id] = e.target.checked;
    }

    return (
        <>
            <p>게임 리스트</p>
            <div>
                {
                    gameList.map((data, i) => {
                        return (
                            <div key={i}>
                                <label htmlFor={"game_" + i}>{data.Title}</label> 
                                 <input name={"game_" + i}  onChange={(e) => changeGameCheckValue(e, data)} type="checkbox" defaultChecked={enableGameDic[gameList[i].id]? "chekced" : ""}/>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Super_Admin_UserSetting_2;