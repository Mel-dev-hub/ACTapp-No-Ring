import { createContext } from "react";

export const UserContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    username: "",
    setUsername: () => {},
    email: "",
    setEmail: () => {}
});