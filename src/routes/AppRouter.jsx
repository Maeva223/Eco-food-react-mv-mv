import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Recuperar from "../pages/Recuperar";
import AdminEmpresas from "../pages/admin/empresas/adminEmpresas";
import AdminClientes from "../pages/admin/cliente/adminClientes";
import AdminAdministradores from "../pages/admin/administradores/adminAdministradores";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar" element={<Recuperar />} />
      <Route
        path="/home/*"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/admin/empresas"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminEmpresas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clientes"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminClientes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/administradores"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminAdministradores />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
