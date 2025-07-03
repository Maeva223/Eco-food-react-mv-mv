import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../services/firebase";

export const getClientes = async () => {
  const usuariosRef = collection(db, "usuarios");
  const q = query(usuariosRef, where("tipo", "==", "cliente"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteCliente = async (id) => {
  const clienteRef = doc(db, "usuarios", id);
  await deleteDoc(doc(db, "usuarios", id));
};
