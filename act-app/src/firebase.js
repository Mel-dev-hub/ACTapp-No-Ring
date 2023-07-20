import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCZI7Rv5jfXfpipeS5d3b0kPQx_RFuPPCc",
    authDomain: "actapp-e21c9.firebaseapp.com",
    projectId: "actapp-e21c9",
    storageBucket: "actapp-e21c9.appspot.com",
    messagingSenderId: "356469049957",
    appId: "1:356469049957:web:50fa6e9bbac5271e6a548c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);