import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    let selectedLoginId = "";
    const set_selectedLoginId = (param) => {
        selectedLoginId = param;
    }

    return <AppContext.Provider value={{name: "Jungmo", selectedLoginId, set_selectedLoginId}}>{children}</AppContext.Provider>
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
    const {selectedLoginId} = useContext(AppContext);
    return selectedLoginId;
}