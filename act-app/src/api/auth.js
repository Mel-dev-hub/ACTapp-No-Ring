import {auth} from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signOut} from "firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";
// import { getAnalytics, setUserId } from "firebase/analytics";

// const setAnalyticsID = (uId) => {
//   const analytics = getAnalytics();
//   setUserId(analytics, uId);
//   // console.log("Set analytics user id: ",uId);
// };

export const register = async (displayName, email, password) => {
    try {
      const userData = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userData.user, {
        displayName: displayName, photoURL: ""
      });
      //setAnalyticsID(userData.user.uid);
      return { status: 200, user: userData.user };
      } catch (err) {
        return { status: 400, message: err.message };
      }
};

export const login = async (email, password) => {
    try {
          var userCredential = await signInWithEmailAndPassword(auth, email, password);
          //setAnalyticsID(userCredential.user.uid);
          return { status: 200, user: userCredential.user };
      } catch (err) {
        return { status: 400, message: err.message };
      }
};

export const getCurrentUser = () => {
    try {
      return getAuth().currentUser;
    } catch (err) {
      return null;
    }
}

export const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
};

