import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAdminLoginId, useEnableGameDic } from './AppContextProvider';

function Admin_Setting() {
    const loginId = useAdminLoginId();
    const enableGameDic = useEnableGameDic();

    const [packet_recv, set_packet_recv] = useState(false);
    const [gameList, setGameList] = useState([]);
    
    useEffect(() => {
        async function func(){
            await Axios.post('/gameList_current_admin', {
                loginId: loginId
            })
            .then((response) => {
                if (!packet_recv)
                {
                    console.log(response.data);
                    setGameList(response.data);
                    set_packet_recv(true);
                }
            })
            .catch((e) => { 
                console.log(e);
            })
        }


        func();
    },[packet_recv, gameList, loginId]);

    const changeGameCheckValue = (e, data) => {
        enableGameDic[data.id] = e.target.checked;
    }

    // const onClick_UpdateSerialSlot = () => {
    //     Axios.post('/update_gameInfo', {
    //        loginId: loginId,
    //        serials: JSON.stringify(serialInfoList),
    //        enableGameDic: JSON.stringify(enableGameDic)
    //     })
    //     .then(function (response) { 
    //     })
    //     .catch(function (error) { console.log(error); });
    // }

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

export default Admin_Setting