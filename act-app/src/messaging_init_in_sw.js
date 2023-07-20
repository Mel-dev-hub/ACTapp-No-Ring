// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyCZI7Rv5jfXfpipeS5d3b0kPQx_RFuPPCc",
//     authDomain: "actapp-e21c9.firebaseapp.com",
//     projectId: "actapp-e21c9",
//     storageBucket: "actapp-e21c9.appspot.com",
//     messagingSenderId: "356469049957",
//     appId: "1:356469049957:web:50fa6e9bbac5271e6a548c"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);
// // Add the public key generated from the console here.
// getToken(messaging, {vapidKey: "BIYl3A1R0Sj6KgUJCMLS0QpCxXTb9RedVf2hGfww1B8sUX1BwXMRlAyHFstTcM5T1f6zWhiDWuoNB9E0tAcAAQ8"})
// .then((currentToken)=>{
//     if(currentToken){
//         console.log("currentToken: ",currentToken);
//     }else{
//         console.log("Cannot find token");
//     }
// });

// export function requestPermission() {
//     console.log('Requesting permission...');
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');
//       }
//       else{
//         console.log('Notification permission denied.');
//       }
//     });
// }

// requestPermission();