import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {MMContextProvider} from "./context/MMContextProvider";
import {UserContextProvider} from "./context/UserContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MMContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </MMContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);