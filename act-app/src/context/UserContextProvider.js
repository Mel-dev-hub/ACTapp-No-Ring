import {useState} from "react";
import {UserContext} from "./UserContext";

export const UserContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    return (
      <UserContext.Provider value={{
        isLoggedIn, 
        setIsLoggedIn,
        username,
        setUsername, 
        email, 
        setEmail
      }}>
        {children}
      </UserContext.Provider>
    );

  };