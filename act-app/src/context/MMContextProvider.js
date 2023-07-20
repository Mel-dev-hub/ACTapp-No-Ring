import {useState} from "react";
import {MMContext} from "./MMContext";

export const MMContextProvider = ({ children }) => {
    const [mmLevel, setMmLevel] = useState(0);
    const [statusBits, setStatusBits] = useState(0);
    const [status, setStatus] = useState("Not connected");
    return (
      <MMContext.Provider value={{
        mmLevel, 
        setMmLevel, 
        statusBits: statusBits, 
        setStatusBits: setStatusBits,
        status,
        setStatus
      }}>
        {children}
      </MMContext.Provider>
    );
  };