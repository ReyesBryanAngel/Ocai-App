import React, { createContext, useContext, useState } from 'react';
const DataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState({});
    // const [apiResponse, setApiResponse] = useState(null);
    // const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState(null);

    return (
        <DataContext.Provider 
          value={{ 
            globalData,
            setGlobalData,
            // apiResponse,
            // setApiResponse,
            role,
            setRole
          }}
        >
          {children}
        </DataContext.Provider>
      );
}

export const useGlobalData = () => {
    return useContext(DataContext);
};