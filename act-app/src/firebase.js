import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCZI7Rv5jfXfpipeS5d3b0kPQx_RFuPPCc",
    authDomain: "actapp-e21c9.firebaseapp.com",
    projectId: "actapp-e21c9",
    storageBucket: "actapp-e21c9.appspot.com",
    messagingSenderId: "356469049957",
    appId: "1:356469049957:web:50fa6e9bbac5271e6a548c",
    measurementId: "G-0K1Y8PT0EE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);