import { createContext } from "react";

export const MMContext = createContext({
    mmLevel: 0,
    setMmLevel: () => {},
    statusBits: 0,
    setStatusBits: () => {},
    status: "Not connected",
    setStatus: () => {}
});