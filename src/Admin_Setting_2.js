import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAdminLoginId, useEnableGameDic } from './AppContextProvider';

function Admin_Setting_2() {
    const loginId = useAdminLoginId();
    
    const [gameList, setGameList] = useState([]);

    const [serialList, setSerialList] = useState([]);

    const [showGameList, setShowGameList] = useState(false);

    const [openGameList, setOpenGameList] = useState({});

    const [currentSerial, set_currentSerial] = useState(0);
    
    useEffect(() => {
        async function func(){
            await Axios.post('/gameList_current_admin', {
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
            await Axios.post('/serial_list', {
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
        openGameList[data.id] = e.target.checked;
    }

    const onClickedInsertButton = (idx) => {
        Axios.post('/openGameList_FromSerial', {
            Serial: serialList[idx]
        })
        .then((response) => {
            console.log(response.data);
            set_currentSerial(serialList[idx]);
            setShowGameList(true);
        })
        .catch((e) => { 
            console.log(e);
        });
    }

    const onClick_UpdateSerialSlot = () => {
        console.log(currentSerial);
        Axios.post('/update_openGameList', {
            Serial: currentSerial,
            openGameList: JSON.stringify(openGameList)
        })
        .then(function (response) { 
        })
        .catch(function (error) { console.log(error); });
    }

    return (
        <>
            <p>Device 리스트</p>
            <div>
                {
                    serialList.map((data, i) => {
                        return (
                            <div key={i}>
                                <label htmlFor={"game_" + i}>{data}</label> 
                                <button onClick={(e) => onClickedInsertButton(i)}>수정</button>
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
                                    <input name={"game_" + i}  onChange={(e) => changeGameCheckValue(e, data)} type="checkbox" defaultChecked={openGameList[gameList[i].id]? "chekced" : ""}/>
                                </div>
                            )
                        })
                    }
                </div>
                
                </div>}
           
        </>
    )
}

export default Admin_Setting_2