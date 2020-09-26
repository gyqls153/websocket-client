import React, { createContext, useContext, useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = ({children}) => {
    return <AppContext.Provider value={{name: "Jungmo"}}>{children}</AppContext.Provider>
};

export default AppContextProvider;

export const useName = () => {
    const {name} = useContext(AppContext);
    return name;
}