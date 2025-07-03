import React, { useEffect, useState } from "react";
import { getClientes, deleteCliente } from "../../../services/clienteService";
import Swal from "sweetalert2";
import AdminNavbar from "../../../components/AdminNavbar"; // ✅ Importación

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      Swal.fire("Error", "No se pudieron cargar los clientes", "error");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar cliente?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCliente(id);
        Swal.fire("Eliminado", "Cliente eliminado correctamente", "success");
        fetchClientes();
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
        Swal.fire("Error", "No se pudo eliminar el cliente", "error");
      }
    }
  };

  return (
    <>
      <AdminNavbar /> {/* ✅ Navbar visible arriba */}
      <div className="container mt-4">
        <h2>Listado de Clientes</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>Comuna</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.direccion}</td>
                <td>{cliente.comuna}</td>
                <td>{cliente.telefono || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No hay clientes registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
