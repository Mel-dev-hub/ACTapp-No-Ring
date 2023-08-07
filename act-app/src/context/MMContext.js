import { createContext } from "react";

export const MMContext = createContext({
    mmLevel: 0,
    setMmLevel: () => {},
    status: "Not connected",
    setStatus: () => {}
});