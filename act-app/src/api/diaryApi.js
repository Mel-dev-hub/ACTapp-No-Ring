import { db } from "../firebase";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";

const diaryCollectionRef = collection(db,"diary");

export const getAllEntries = async () => {
    try {
        const data = await getDocs(diaryCollectionRef);
        const filteredData = data.docs.map((doc) => ({
            ...doc.data(), 
            id: doc.id
        }));
        return filteredData;
      } catch (err) {
        console.error(err);
      }
};

export const addEntry = async (title, content) => {
  try {
      await addDoc(diaryCollectionRef, {
        title: title,
        date: new Date(),
        content: content
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

export const getEntry = async (id) => {
  try {
    const entryDoc = doc(db, "diary", id);
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