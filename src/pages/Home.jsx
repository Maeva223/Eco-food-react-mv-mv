import React, { useContext, useEffect, useState } from "react";
import CerrarSesion from "../components/CerrarSesion";
import { getUserData } from "../services/userService";
import { AuthContext } from "../context/AuthProvider";
import { getEmpresas } from "../services/empresaService";
import ProductosEmpresa from "./admin/empresas/ProductosEmpresa";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        const datos = await getUserData(user.uid);
        setUserData(datos);
      }
      // Cargar empresas para todos
      const empresasData = await getEmpresas();
      setEmpresas(empresasData);
    };
    fetchData();
  }, [user]);

  return (
    <div className="container mt-4">
      <h2>Bienvenido a EcoFood, {user ? user.email : "invitado"}</h2>
      {userData && <p>Nombre registrado: {userData.nombre}</p>}
      {userData && userData.tipo === "admin" && (
        <button
          className="btn btn-dark mb-3"
          onClick={() => navigate("/admin/empresas")}
        >
          Ir al Panel de Administrador
        </button>
      )}
      <CerrarSesion />
      <h1 className="mt-4">Empresas</h1>
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
                    className="btn btn-info btn-sm"
                    onClick={() => setEmpresaSeleccionada(empresa)}
                  >
                    Ver Productos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {empresaSeleccionada && (
        <div className="mt-4">
          <h4>Productos de {empresaSeleccionada.nombre}</h4>
          <ProductosEmpresa
            empresaId={empresaSeleccionada.id}
            onClose={() => setEmpresaSeleccionada(null)}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => setEmpresaSeleccionada(null)}
          >
            Cerrar Productos
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
