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

        func2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const changeGameCheckValue = (e, data) => {
        let newOpenGameList = {};
    
        for (const key of Object.keys(openGameList)) {
            newOpenGameList[key] = openGameList[key];
        }

        newOpenGameList[data.id] = !newOpenGameList[data.id];
        setOpenGameList(newOpenGameList);
    }

    const onClickedInsertButton = (idx) => {
        Axios.post('/openGameList_FromSerial', {
            Serial: serialList[idx]
        })
        .then((response) => {
            console.log(response.data);
            set_currentSerial(serialList[idx]);
            setShowGameList(true);

            let newBuyGameList = {};

            const buyGameList = response.data.buyGameList;
            
            for (const key of Object.keys(buyGameList)) {
                newBuyGameList[key] = buyGameList[key];
            }

            setGameList(newBuyGameList);
            
            let openGameList = [];
            if (response.data.openGameList.length > 0)
                openGameList = JSON.parse(response.data.openGameList);

            let newOpenGameList = {};

            for (const key of Object.keys(openGameList)) {
                console.log(key);
                newOpenGameList[key] = openGameList[key];
            }

            setOpenGameList(newOpenGameList);
        })
        .catch((e) => { 
            console.log(e);
        });
    }

    const onClick_UpdateSerialSlot = () => {
        console.log(currentSerial);
        Axios.post('/update_openGameList', {
            Serial: currentSerial,
            openGameList: openGameList
        })
        .then(function (response) { 
        })
        .catch(function (error) { console.log(error); });
    }
    const items = []

    for (const i of Object.keys(gameList)) {
        const data = gameList[i];
        items.push(
        <div key={i}>
            <label htmlFor={"game_" + i}>{data.Title}</label> 
            <input name={"game_" + i} checked={!!openGameList[data.id]} onChange={(e) => changeGameCheckValue(e, data)} type="checkbox" />
        </div>)
    }

    console.log(items);

    return (
        <>
            <p>Device 리스트</p>
            <div>
                {
                    serialList && serialList.map((data, i) => {
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
                    {items}
                </div>
                
                </div>}
           
        </>
    )
}

export default Admin_Setting_2