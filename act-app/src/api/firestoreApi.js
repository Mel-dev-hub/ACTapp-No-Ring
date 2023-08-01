import { db, auth } from "../firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc, where, query } from "firebase/firestore";

const diaryCollectionRef = collection(db,"diary");
const valuesCollectionRef = collection(db,"values");

export const getAllUserEntries = async (userId) => {
  try {
      const q = query(diaryCollectionRef, where("userId", "==", userId));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
      }));
      return filteredData;
    } catch (err) {        
      console.error(err);
      return [];
    }
};

export const getAllUserValues = async (userId) => {
  try {
      const q = query(valuesCollectionRef, where("userId", "==", userId));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
      }));
      return filteredData;
    } catch (err) {
      console.error(err);
      return [];
    }
};

export const addEntry = async (title, content) => {
  try {
      await addDoc(diaryCollectionRef, {
        title: title,
        date: new Date(),
        content: content,
        userId: auth?.currentUser?.uid
      });
    } catch (err) {
      console.error(err);
    }
};

export const addValue = async (title, content) => {
  try {
      await addDoc(valuesCollectionRef, {
        title: title,
        date: new Date(),
        content: content,
        userId: auth?.currentUser?.uid
      });
    } catch (err) {
      console.error(err);
    }
};

export const deleteEntry = async (id) => {
  try {
    const entryDoc = doc(db, "diary", id);
    await deleteDoc(entryDoc);
  } catch (err) {
    console.error(err);
  }
};

export const deleteValue = async (id) => {
  try {
    const entryDoc = doc(db, "values", id);
    await deleteDoc(entryDoc);
  } catch (err) {
    console.error(err);
  }
};

export const getEntry = async (id) => {
  try {
    const entryDoc = doc(db, "diary", id);
    const docSnap = await getDoc(entryDoc);
    return docSnap.data();
  } catch (err) {
    console.error(err);
  }
};

export const getValue = async (id) => {
  try {
    const entryDoc = doc(db, "values", id);
    const docSnap = await getDoc(entryDoc);
    return docSnap.data();
  } catch (err) {
    console.error(err);
  }
};

export const updateEntry = async (id, newTitle, newContent) => {
  try {
    const entryDoc = doc(db, "diary", id);
    await updateDoc(entryDoc, {
      title: newTitle,
      content: newContent
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateValue = async (id, newTitle, newContent) => {
  try {
    const entryDoc = doc(db, "values", id);
    await updateDoc(entryDoc, {
      title: newTitle,
      content: newContent
    });
  } catch (err) {
    console.error(err);
  }
};