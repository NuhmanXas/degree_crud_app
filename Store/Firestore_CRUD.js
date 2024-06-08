import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseConfig";



export const createDataInFirestore = async ({ _collection, _data }) => {
  try {
    return addDoc(collection(db, _collection), _data)
      .then((val) => val.id)
      .catch((err) => {
        console.log(err);
        return false;
      });
    // return docRef.id;
  } catch (e) {
    console.log("error adding document : " + e);
  }
};

export const updateDataInFirestore = async ({ _collection, _data, _id }) => {
  try {
    const selectedDocRef = doc(db, _collection, _id);

    return updateDoc(selectedDocRef, _data)
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (e) {
    console.log("error adding document : " + e);
  }
};

export const deleteDataInFirestore = async ({ _collection, _id }) => {
  try {
    const selectedDocRef = doc(db, _collection, _id);

    return deleteDoc(selectedDocRef)
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return false;
      });
  } catch (e) {
    console.log("error adding document : " + e);
  }
};

export const getAllDataFromFirestore = async ({ _collection }) => {
  try {
    const list = [];
    const listRef = await getDocs(collection(db, _collection));
    listRef.forEach((doc) => {
      let obj = doc.data();
      obj._id = doc.id;
      list.push(obj);
    });
    return list;
  } catch (e) {
    console.log("error geting all data");
    console.log(e);
  }
};
export const getAllDataFromFirestoreRealTime = async ({
  _collection,
  callbackFun,
}) => {
  try {
    let list = [];
    const listRef = collection(db, _collection);

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(listRef, (querySnapshot) => {
      list = [];
      list.splice(0, list.length); // Clear the existing list
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        obj._id = doc.id;
        console.log(obj);
        list.push(obj);
      });

      callbackFun(list);
    });

    // Return the unsubscribe function if needed to detach the listener
    return () => unsubscribe();
  } catch (e) {
    console.log("error getting all data");
    console.log(e);
  }
};

export const getDataByIdFromFirestore = async ({ _collection, _id }) => {
  try {
    const docRef = doc(db, _collection, _id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (e) {
    console.log("error geting all data");
    console.log(e);
  }
};
