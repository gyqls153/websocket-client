import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [value, setValue] = useState( {
        loginId: ""
    })

    const [admin_loginId, set_admin_loginId] = useState("");

    const set_selectedLoginId = (param) => {
        setValue(param);
    }

    const [enableGameDic, set_enableGameDic] = useState({});
    const [serialInfoList, setSerialInfoList] = useState([]);
    const [currentSerial, set_currentSerial] = useState(0);
    
    return <AppContext.Provider value={
        {
            name: "Jungmo", 
            value, 
            set_selectedLoginId, 
            
            enableGameDic,
            set_enableGameDic,

            admin_loginId,
            set_admin_loginId,
            
            serialInfoList,
            setSerialInfoList,
            
            currentSerial,
            set_currentSerial
        }
    }>{children}</AppContext.Provider>
};

export default AppContextProvider;

export const useName = () => {
    const {name} = useContext(AppContext);
    return name;
}

export const useSetSelectedLoginId = () => {
    const {set_selectedLoginId} = useContext(AppContext);
    return set_selectedLoginId;
}

export const useSelectedLoginId = () => {
    const {value} = useContext(AppContext);
    return value;
}

export const useSetAdminLoginId = () => {
    const {set_admin_loginId} = useContext(AppContext);
    return set_admin_loginId;
}

export const useAdminLoginId = () => {
    const {admin_loginId} = useContext(AppContext);
    return admin_loginId;
}

export const useEnableGameDic = () => {
    const {enableGameDic} = useContext(AppContext);
    return enableGameDic;
}

export const useSetEnableGameDic = () => {
    const {set_enableGameDic} = useContext(AppContext);
    return set_enableGameDic;
}

export const useSerialInfoList = () => {
    const {serialInfoList} = useContext(AppContext);
    return serialInfoList;
}

export const useSetSerialInfoList = () => {
    const {setSerialInfoList} = useContext(AppContext);
    return setSerialInfoList;
}

export const useSelectedSerial = () => {
    const {currentSerial} = useContext(AppContext);
    return currentSerial;
}

export const useSetSelectedSerial = () => {
    const {set_currentSerial} = useContext(AppContext);
    return set_currentSerial;
}

