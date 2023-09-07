import { db, auth } from "../firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc, where, query } from "firebase/firestore";

const diaryCollectionRef = collection(db,"diary");
const valuesCollectionRef = collection(db,"values");
const exercisesLogCollectionRef = collection(db,"exercisesLog");
const diaryLogCollectionRef = collection(db,"diaryLog");
const valuesLogCollectionRef = collection(db,"valuesLog");

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

export const addDiaryLog = async (action) => {
  try {
      await addDoc(diaryLogCollectionRef, {
        action: action,
        date: new Date(),
        userId: auth?.currentUser?.uid
      });
    } catch (err) {
      console.error(err);
    }
};

export const addValuesLog = async (action) => {
  try {
      await addDoc(valuesLogCollectionRef, {
        action: action,
        date: new Date(),
        userId: auth?.currentUser?.uid
      });
    } catch (err) {
      console.error(err);
    }
};

export const addExerciseLog = async (action, appId) => {
  try {
      await addDoc(exercisesLogCollectionRef, {
        action: action,
        appId: appId,
        date: new Date(),
        userId: auth?.currentUser?.uid
      });
    } catch (err) {
      console.error(err);
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
      await addDiaryLog("DIARY ENTRY CREATED");
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
      await addValuesLog("VALUE CREATED");
    } catch (err) {
      console.error(err);
    }
};

export const deleteEntry = async (id) => {
  try {
    const entryDoc = doc(db, "diary", id);
    await deleteDoc(entryDoc);
    await addDiaryLog("DIARY ENTRY DELETED");
  } catch (err) {
    console.error(err);
  }
};

export const deleteValue = async (id) => {
  try {
    const entryDoc = doc(db, "values", id);
    await deleteDoc(entryDoc);
    await addValuesLog("VALUE DELETED");
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
    await addDiaryLog("DIARY ENTRY UPDATED");
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
    await addValuesLog("VALUE UPDATED");
  } catch (err) {
    console.error(err);
  }
};