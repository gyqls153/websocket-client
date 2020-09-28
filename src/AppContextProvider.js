import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [value, setValue] = useState( {
        loginId: ""
    })

    const set_selectedLoginId = (param) => {
        setValue(param);
    }

    return <AppContext.Provider value={{name: "Jungmo", value, set_selectedLoginId}}>{children}</AppContext.Provider>
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