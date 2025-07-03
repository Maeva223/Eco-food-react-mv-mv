import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrFwEuKdZk1walAI5AIEvwNYfazIz54gU",
  authDomain: "ecofood-app-8e771.firebaseapp.com",
  projectId: "ecofood-app-8e771",
  storageBucket: "ecofood-app-8e771.appspot.com",
  messagingSenderId: "1006055374200",
  appId: "1:1006055374200:web:10c7236b27d207e2569c8d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
