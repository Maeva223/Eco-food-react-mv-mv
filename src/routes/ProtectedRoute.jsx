import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Si no hay usuario o no ha verificado su correo, redirige a login
  if (!user || !user.emailVerified) {
    return <Navigate to="/login" />;
  }

  // Si todo está bien, deja pasar
  return children;
}
