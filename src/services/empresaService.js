import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const empresasRef = collection(db, "empresas");

export const getEmpresas = async () => {
  const snapshot = await getDocs(empresasRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addEmpresa = async (empresaData) => {
  await addDoc(empresasRef, empresaData);
};

export const updateEmpresa = async (id, empresaData) => {
  const empresaDoc = doc(db, "empresas", id);
  await updateDoc(empresaDoc, empresaData);
};

export const deleteEmpresa = async (id) => {
  const empresaDoc = doc(db, "empresas", id);
  await deleteDoc(empresaDoc);
};

export const getEmpresaByUID = async (uid) => {
  const empresaDoc = doc(db, "empresas", uid);
  const snapshot = await getDoc(empresaDoc);
  return { id: snapshot.id, ...snapshot.data() };
};
