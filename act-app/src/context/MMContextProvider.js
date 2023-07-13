import {useState} from "react";
import {MMContext} from "./MMContext";

export const MMContextProvider = ({ children }) => {
    const [mmLevel, setMmLevel] = useState(0);
    return (
      <MMContext.Provider value={{mmLevel, setMmLevel}}>
        {children}
      </MMContext.Provider>
    );
  };