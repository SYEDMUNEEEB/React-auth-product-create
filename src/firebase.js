import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc,getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { onSnapshot } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyADAQtufRjnrZUCGdMu7QUlI6qLiJy4K-I",
  authDomain: "justforpractise-e636c.firebaseapp.com",
  databaseURL: "https://justforpractise-e636c-default-rtdb.firebaseio.com",
  projectId: "justforpractise-e636c",
  storageBucket: "justforpractise-e636c.appspot.com",
  messagingSenderId: "393444649138",
  appId: "1:393444649138:web:3bfee75e96a6f79ae001ab",
  measurementId: "G-S73BN8NZRH"
};

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);




export const auth = getAuth(app);
export { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL ,getDocs};
export { onSnapshot };