import React, { useEffect, useState, useContext } from "react";
import {
  getAdministradores,
  addAdministrador,
  updateAdministrador,
  deleteAdministrador,
} from "../../../services/adminService";
import Swal from "sweetalert2";
import AdminNavbar from "../../../components/AdminNavbar"; // ✅ Importación
import { AuthContext } from "../../../context/AuthProvider";

export default function AdminAdministradores() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    esAdminPrincipal: false,
    tipo: "admin",
  });
  const [editId, setEditId] = useState(null);
  const { user, userData } = useContext(AuthContext);

  const fetchAdmins = async () => {
    const data = await getAdministradores();
    setAdmins(data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateAdministrador(editId, form);
        Swal.fire(
          "Actualizado",
          "Administrador actualizado correctamente",
          "success"
        );
      } else {
        await addAdministrador(form);
        Swal.fire(
          "Agregado",
          "Administrador agregado correctamente",
          "success"
        );
      }
      setForm({
        nombre: "",
        email: "",
        esAdminPrincipal: false,
        tipo: "admin",
      });
      setEditId(null);
      fetchAdmins();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEdit = (admin) => {
    setForm(admin);
    setEditId(admin.id);
  };

  const handleDelete = async (id, esAdminPrincipal, email) => {
    // Si el admin es principal, no se puede eliminar
    if (esAdminPrincipal) {
      return Swal.fire(
        "Error",
        "No se puede eliminar el administrador principal.",
        "error"
      );
    }
    // Si el usuario actual no es principal y quiere eliminar a otro admin
    if (!userData?.esAdminPrincipal && user?.email !== email) {
      return Swal.fire(
        "Error",
        "Solo el administrador principal puede eliminar a otros administradores.",
        "error"
      );
    }
    // Si el usuario actual intenta eliminarse a sí mismo y es principal
    if (userData?.esAdminPrincipal && user?.email === email) {
      return Swal.fire(
        "Error",
        "El administrador principal no puede eliminarse a sí mismo.",
        "error"
      );
    }
    const confirm = await Swal.fire({
      title: "¿Eliminar administrador?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (confirm.isConfirmed) {
      try {
        await deleteAdministrador(id);
        Swal.fire(
          "Eliminado",
          "Administrador eliminado correctamente",
          "success"
        );
        fetchAdmins();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>Administradores</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  nombre: e.target.value.slice(0, 20),
                }))
              }
              className="form-control"
              required
              maxLength={20}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  email: e.target.value.slice(0, 40),
                }))
              }
              className="form-control"
              required
              maxLength={40}
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              name="esAdminPrincipal"
              checked={form.esAdminPrincipal}
              onChange={handleChange}
              className="form-check-input"
              id="adminPrincipalCheck"
              disabled={form.esAdminPrincipal}
            />
            <label htmlFor="adminPrincipalCheck" className="form-check-label">
              Administrador Principal
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            {editId ? "Actualizar" : "Agregar"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditId(null);
                setForm({
                  nombre: "",
                  email: "",
                  esAdminPrincipal: false,
                  tipo: "admin",
                });
              }}
            >
              Cancelar
            </button>
          )}
        </form>

        <hr />

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Admin Principal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.nombre}</td>
                <td>{admin.email}</td>
                <td>{admin.esAdminPrincipal ? "Sí" : "No"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(admin)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      handleDelete(
                        admin.id,
                        admin.esAdminPrincipal,
                        admin.email
                      )
                    }
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay administradores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
