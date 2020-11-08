import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [value, setValue] = useState( {
        loginId: ""
    })

    const set_selectedLoginId = (param) => {
        setValue(param);
    }

    const [enableGameDic, set_enableGameDic] = useState({});
    const [serialInfoList, setSerialInfoList] = useState([]);
    
    const [currentCustomer, set_currentCustomer] = useState("");
    
    return <AppContext.Provider value={
        {
            name: "Jungmo", 
            value, 
            set_selectedLoginId, 
            
            enableGameDic,
            set_enableGameDic,

            serialInfoList,
            setSerialInfoList,
            
            currentCustomer,
            set_currentCustomer
        }
    }>{children}</AppContext.Provider>
};

export default AppContextProvider;

export const useName = () => {
    const {name} = useContext(AppContext);
    return name;
}

export const useSelectedLoginId = () => {
    const {value} = useContext(AppContext);
    return value;
}

export const useSetSelectedLoginId = () => {
    const {set_selectedLoginId} = useContext(AppContext);
    return set_selectedLoginId;
}

export const useCurrentCustomer = () => {
    const {currentCustomer} = useContext(AppContext);
    return currentCustomer;
}

export const useSetCurrentCustomer = () => {
    const {set_currentCustomer} = useContext(AppContext);
    return set_currentCustomer;
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