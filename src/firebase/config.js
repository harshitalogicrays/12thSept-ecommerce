import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyA_B9UfKo4mXzc9htHzCWqrBrJ3fp6ihaA",
  authDomain: "thsept-mini-filpcart.firebaseapp.com",
  projectId: "thsept-mini-filpcart",
  storageBucket: "thsept-mini-filpcart.appspot.com",
  messagingSenderId: "572774760301",
  appId: "1:572774760301:web:6990c7e7b4108304292464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app