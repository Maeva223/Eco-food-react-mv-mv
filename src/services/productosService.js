import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

const productosRef = collection(db, "productos");

export const getProductosByEmpresa = async (empresaId) => {
  const q = query(productosRef, where("empresaId", "==", empresaId));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addProducto = async (data) => {
  await addDoc(productosRef, data);
};

export const updateProducto = async (id, data) => {
  await updateDoc(doc(db, "productos", id), data);
};

export const deleteProducto = async (id) => {
  await deleteDoc(doc(db, "productos", id));
};
