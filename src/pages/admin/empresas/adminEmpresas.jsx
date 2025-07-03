import React, { useEffect, useState } from "react";
import {
  getEmpresas,
  addEmpresa,
  updateEmpresa,
  deleteEmpresa,
} from "../../../services/empresaService";
import EmpresaForm from "../../../components/EmpresaForm";
import AdminNavbar from "../../../components/AdminNavbar";
import Swal from "sweetalert2";

export default function AdminEmpresas() {
  const [empresas, setEmpresas] = useState([]);
  const [editEmpresa, setEditEmpresa] = useState(null);

  const fetchEmpresas = async () => {
    const datos = await getEmpresas();
    setEmpresas(datos);
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const handleAgregar = async (nuevaEmpresa) => {
    await addEmpresa(nuevaEmpresa);
    fetchEmpresas();
  };

  const handleEditar = (empresa) => {
    setEditEmpresa(empresa);
  };

  const handleActualizar = async (empresaActualizada) => {
    await updateEmpresa(editEmpresa.id, empresaActualizada);
    setEditEmpresa(null);
    fetchEmpresas();
  };

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar empresa?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (confirm.isConfirmed) {
      await deleteEmpresa(id);
      fetchEmpresas();
      Swal.fire("Eliminado", "Empresa eliminada correctamente", "success");
    }
  };

  // Placeholder: Asociación de productos a empresas
  // En el futuro, puedes reemplazar esto por una lógica real y un modal o sección para asociar productos
  const handleAsociarProductos = (empresa) => {
    Swal.fire({
      title: `Asociar productos a ${empresa.nombre}`,
      text: "Aquí irá la funcionalidad para asociar productos a la empresa.",
      icon: "info",
      confirmButtonText: "Cerrar",
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>Listado de Empresas</h2>
        {editEmpresa ? (
          <>
            <EmpresaForm
              onSubmit={handleActualizar}
              initialData={editEmpresa}
            />
            <button
              className="btn btn-secondary mt-2"
              onClick={() => setEditEmpresa(null)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <EmpresaForm onSubmit={handleAgregar} />
        )}
        <hr />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>RUT</th>
                <th>Dirección</th>
                <th>Comuna</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
                <th>Productos</th>
              </tr>
            </thead>
            <tbody>
              {empresas.map((empresa) => (
                <tr key={empresa.id}>
                  <td>{empresa.nombre}</td>
                  <td>{empresa.rut}</td>
                  <td>{empresa.direccion}</td>
                  <td>{empresa.comuna}</td>
                  <td>{empresa.email}</td>
                  <td>{empresa.telefono}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditar(empresa)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(empresa.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => handleAsociarProductos(empresa)}
                    >
                      Asociar Productos
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
