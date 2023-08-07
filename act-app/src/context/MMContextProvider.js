import {useState} from "react";
import {MMContext} from "./MMContext";

export const MMContextProvider = ({ children }) => {
    const [mmLevel, setMmLevel] = useState(0);
    const [status, setStatus] = useState("Not connected");
    return (
      <MMContext.Provider value={{
        mmLevel, 
        setMmLevel, 
        status,
        setStatus
      }}>
        {children}
      </MMContext.Provider>
    );
  };