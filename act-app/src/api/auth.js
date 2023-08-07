import {auth} from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signOut} from "firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";
import { getAuth, updateProfile } from "firebase/auth";

export const register = async (displayName, email, password) => {
    try {
      const userData = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userData.user, {
        displayName: displayName, photoURL: ""
      });
      return { status: 200, user: userData.user };
      } catch (err) {
        return { status: 400, message: err.message };
      }
};

export const login = async (email, password) => {
    try {
          var userCredential = await signInWithEmailAndPassword(auth, email, password);
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

