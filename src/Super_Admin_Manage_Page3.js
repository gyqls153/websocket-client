
import styled from 'styled-components'
import React, {useState, useEffect} from 'react';
import Super_Admin_Manage_Customer2 from './Super_Admin_Manage_Customer2';
import axios from 'axios';
import { useAdminLoginId, useEnableGameDic, useSelectedSerial, useSetSelectedSerial } from './AppContextProvider';
import { useCurrentCustomer, useSetCurrentCustomer } from './AppContextProvider'


const HEADER = styled.div`
    background-color: red;
    height: 70px;
`;

const BACKBUTTON = styled.img`
width: 20px;
margin-left: 10px;
margin-top: 10px;
`

const LOGO = styled.img`
width: 100px;
position: absolute; 
left: 50%; transform: translateX(-50%);
top: 2%;
`

const NANUM_GOTHIC = styled.p`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    text-align: center;
    margin: -30px;
    color: white;
    `

const INPUT = styled.input`
    margin-bottom: 10px;
    height: 3vh;  
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    width: 50%;
    background-Color: white;
    padding: 0px;
    margin-left: 25%;
    `

const MAINBACKGROUND = styled.div`
    background-color: gray;
    height: 100vh;
`;

const MAINGAP = styled.div`
    height: 10px;
`;

const BUTTON = styled.button`
    position:absolute; 
    bottom:10px;
    left: 25%;
    width: 50%;
    height: 6vh;
    background-Color: red;
    border: 0;
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 20px;
    color: white;
    font-weight: bold;
  `

  const ADDBUTTON = styled.img`
    float: right;
    width: 40px;
    margin-right: 10px;
`;

function Super_Admin_Manage_Page3(props) {
    
    async function removeSerial(id) {
        console.log("removeSerial")

    await axios.post('/remove_admin_user', {
        id
    }).then(function (response) {
    }).catch(function (error) {
    console.log(error);
    });
    }

    const [serials, setSerials] = useState([]);
    const loginId = useAdminLoginId();

    async function func() {
        await axios.post('/serial_list', { loginId }).then(function (response) {
            console.log(response.data);
            setSerials(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    }

    useEffect(() => {
        func();
      
      }, []);

    const zeroPad = (num, places) => String(num).padStart(places, '0');
    let idx = 0;

    const dataList = serials.map(
    (data) => {    
    idx ++;
    
    const dataName = "Spark " + zeroPad(idx,2);
    console.log(dataName);

    return <Super_Admin_Manage_Customer2 key = {data} customerName={dataName} serial={data} removeFunc={() => removeSerial(data.id)}></Super_Admin_Manage_Customer2>
    }
    );

      // 시리얼 생성
    function createSerial()
    {
        axios.post('/createSerial')
        .then(function (response) { 
            setSerials([...serials, response.data.value]);
        })
        .catch(function (error) { });
    }

    const setCurrentCustomer = useSetCurrentCustomer();
    setCurrentCustomer("안동초등학교");
    const currentCustomer = useCurrentCustomer();

    function addSerial(id) {
        console.log("clicked");
        /* eslint no-restricted-globals:0 */
        const result = confirm("제품을 추가하시겠습니까?");

        if (result) {
            createSerial();
        }
    }

    return(
        <>
            <HEADER>    
                <BACKBUTTON onClick={() => props.history.goBack()} src="Remote/Btn_BackArrow.PNG"></BACKBUTTON>
                <NANUM_GOTHIC>{currentCustomer}</NANUM_GOTHIC>
                <ADDBUTTON onClick={() => { addSerial(); }} src="Remote/Btn_Plus.PNG"></ADDBUTTON>
            </HEADER>
            <MAINBACKGROUND>
                <MAINGAP/>
                {dataList}
            </MAINBACKGROUND>
        </>
    );
}

export default Super_Admin_Manage_Page3;