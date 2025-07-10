import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { auth } from "../services/firebase";
import Swal from "sweetalert2";

export default function AdminNavbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      await auth.signOut();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer", color: "#fff", fontWeight: "bold" }}
          onClick={() => navigate("/home")}
        >
          Admin Panel
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarAdmin"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarAdmin">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/empresas">
                Empresas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/clientes">
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/administradores">
                Administradores
              </Link>
            </li>
          </ul>

          <span className="navbar-text me-3">{user?.email}</span>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
