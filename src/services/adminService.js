import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../services/firebase";

const adminsCollection = collection(db, "usuarios");

export const getAdministradores = async () => {
  const q = query(
    adminsCollection,
    where("tipo", "in", ["admin", "adminPrincipal"])
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addAdministrador = async (adminData) => {
  if (adminData.esAdminPrincipal) {
    const admins = await getAdministradores();
    const existePrincipal = admins.some((a) => a.esAdminPrincipal);
    if (existePrincipal)
      throw new Error("Ya existe un administrador principal.");
  }
  await addDoc(adminsCollection, adminData);
};

export const updateAdministrador = async (id, adminData) => {
  if (adminData.esAdminPrincipal) {
    const admins = await getAdministradores();
    const existePrincipal = admins.some(
      (a) => a.esAdminPrincipal && a.id !== id
    );
    if (existePrincipal)
      throw new Error("Ya existe un administrador principal.");
  }
  const adminRef = doc(db, "usuarios", id);
  await updateDoc(adminRef, adminData);
};

export const deleteAdministrador = async (id) => {
  const adminRef = doc(db, "usuarios", id);
  const docSnap = await getDoc(adminRef);
  if (!docSnap.exists()) {
    throw new Error("Administrador no encontrado.");
  }
  const admin = docSnap.data();

  if (admin && admin.esAdminPrincipal) {
    throw new Error("No se puede eliminar el administrador principal.");
  }

  await deleteDoc(adminRef);
};
