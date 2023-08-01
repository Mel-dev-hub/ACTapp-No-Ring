import {auth} from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signOut} from "firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";
import { getAuth } from "firebase/auth";

export const register = async (email, password) => {
    try {
      var userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { status: 200, user: userCredential.user };
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

export const getCurrentUser = async () => {
    try {
      return await getAuth().currentUser;
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

