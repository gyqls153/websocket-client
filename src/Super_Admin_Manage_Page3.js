
import styled from 'styled-components'
import React, {useState, useEffect} from 'react';
import Super_Admin_Manage_Customer2 from './Super_Admin_Manage_Customer2';
import axios from 'axios';
import { useAdminLoginId, useSelectedLoginId } from './AppContextProvider';
import { useCurrentCustomer, useSetCurrentCustomer } from './AppContextProvider'


const HEADER = styled.div`
    background-color: #CD282D;
    height: 100px;
`;

const BACKBUTTON = styled.img`
    width: 20px;
    margin-left: 15px;
    margin-top: 30px;
`

const LOGO = styled.img`
width: 100px;
position: absolute; 
left: 50%; transform: translateX(-50%);
top: 2%;
`

const NANUM_GOTHIC = styled.span`
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    color: white;
    font-weight: bold;
    font-size: 30px;
    position: absolute;
    top: 30px;
    left: 50%;
    transform:translateX(-50%);
    `

const INPUT = styled.input`
    margin-bottom: 10px;
    height: 30px;  
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);
    font-family: 'Nanum Gothic', sans-serif;
    width: 50%;
    background-Color: white;
    padding: 0px;
    margin-left: 25%;
    `

const MAINBACKGROUND = styled.div`
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
    margin-right: 15px;
    margin-top: 30px;
`;

function Super_Admin_Manage_Page3(props) {
    const [serials, setSerials] = useState([]);
    const loginId = useSelectedLoginId();

    async function removeSerial(id) {
        console.log(id)

    await axios.post('/RemoveSerial', {
        Serial:id,
        loginId : loginId
    }).then(function (response) {
        setSerials(response.data);
    }).catch(function (error) {
    console.log(error);
    });
    }

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
    
    const dataName = "SPark " + zeroPad(idx,2);
    console.log(dataName);

    return <Super_Admin_Manage_Customer2 key = {data} customerName={dataName} serial={data} removeFunc={() => removeSerial(data)}></Super_Admin_Manage_Customer2>
    }
    );

      // 시리얼 생성
    function createSerial()
    {
        axios.post('/createSerial', {loginId})
        .then(function (response) { 
            setSerials([...serials, response.data.value]);
        })
        .catch(function (error) { });
    }

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