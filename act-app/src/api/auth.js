import {auth} from "../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {signOut} from "firebase/auth";
import {signInWithEmailAndPassword} from "firebase/auth";

export const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return { status: 200 };
      } catch (err) {
        return { status: 400, message: err.message };
      }
};

export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { status: 200 };
      } catch (err) {
        return { status: 400, message: err.message };
      }
};

export const getCurrentUserEmail = () =>{
    try {
        const email = auth.currentUser.email.toString();
        return email;
      } catch (err) {
        return "";
      }
}

export const getCurrentUser = () =>{
    return auth.currentUser;
}

export const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
};

