import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user || !user.emailVerified) {
    return <Navigate to="/login" />;
  }

  return children;
}