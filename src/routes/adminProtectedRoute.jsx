import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { user, userData } = useContext(AuthContext);

  if (!user || !user.emailVerified) {
    return <Navigate to="/login" />;
  }

  const isAdmin = userData?.tipo === "admin";

  if (!isAdmin) {
    return <Navigate to="../../components/adminNavbar" />;
  }

  return children;
}
