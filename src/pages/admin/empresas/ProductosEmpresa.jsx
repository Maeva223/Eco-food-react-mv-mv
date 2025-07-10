import React, { useContext, useEffect, useState } from "react";
import {
  getProductosByEmpresa,
  addProducto,
  updateProducto,
  deleteProducto,
} from "../../../services/productosService";
import ProductoCard from "../../../components/ProductoCard";
import ProductoModal from "../../../components/ProductoModal";
import { AuthContext } from "../../../context/AuthProvider";
import moment from "moment";

export default function ProductosEmpresa({ empresaId, onClose }) {
  const { userData } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [orden, setOrden] = useState("alfabetico");

  const fetch = async () => {
    const data = await getProductosByEmpresa(empresaId);
    setProductos(data);
  };

  useEffect(() => {
    if (empresaId) fetch();
  }, [empresaId]);

  const handleGuardar = async (data) => {
    if (data.id) {
      await updateProducto(data.id, data);
    } else {
      await addProducto({ ...data, empresaId });
    }
    fetch();
  };

  const handleEliminar = async (id) => {
    await deleteProducto(id);
    fetch();
  };

  // Filtrado por estado
  let productosFiltrados = productos.filter((p) => {
    if (filtroEstado === "todos") return true;
    if (filtroEstado === "vencido") {
      return moment(p.vencimiento).isBefore(moment(), "day");
    }
    if (filtroEstado === "por vencer") {
      // Incluye productos que vencen hoy o en los próximos 3 días
      const dias = moment(p.vencimiento).diff(moment(), "days");
      return dias >= 0 && dias <= 3;
    }
    if (filtroEstado === "disponible") {
      return moment(p.vencimiento).diff(moment(), "days") > 3;
    }
    return true;
  });

  // Ordenamiento
  productosFiltrados = [...productosFiltrados].sort((a, b) => {
    if (orden === "alfabetico") {
      return a.nombre.localeCompare(b.nombre);
    }
    if (orden === "precioAsc") {
      return a.precio - b.precio;
    }
    if (orden === "precioDesc") {
      return b.precio - a.precio;
    }
    return 0;
  });

  // Paginación
  const [pagina, setPagina] = useState(1);
  const [productosPorPagina, setProductosPorPagina] = useState(5);
  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );
  const productosPagina = productosFiltrados.slice(
    (pagina - 1) * productosPorPagina,
    pagina * productosPorPagina
  );

  // Resetear página si cambia el filtro, el orden o la cantidad por página
  useEffect(() => {
    setPagina(1);
  }, [filtroEstado, orden, productosPorPagina]);

  return (
    <div className="container mt-2">
      {userData?.tipo === "admin" && (
        <button
          className="btn btn-success mb-2"
          onClick={() => setModalData({})}
        >
          Agregar Producto
        </button>
      )}
      {/* Filtros y orden */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Filtrar por estado:</label>
          <select
            className="form-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="disponible">En buen estado</option>
            <option value="por vencer">Por vencer</option>
            <option value="vencido">Vencidos</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Ordenar por:</label>
          <select
            className="form-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="alfabetico">Alfabético (A-Z)</option>
            <option value="precioAsc">Precio: menor a mayor</option>
            <option value="precioDesc">Precio: mayor a menor</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Productos por página:</label>
          <select
            className="form-select"
            value={productosPorPagina}
            onChange={(e) => setProductosPorPagina(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <div className="row">
        {productosPagina.map((p) => (
          <div className="col-md-4" key={p.id}>
            <ProductoCard
              producto={p}
              onEdit={userData?.tipo === "admin" ? setModalData : undefined}
              onDelete={userData?.tipo === "admin" ? handleEliminar : undefined}
            />
          </div>
        ))}
      </div>
      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      )}
      {modalData !== null && userData?.tipo === "admin" && (
        <ProductoModal
          producto={modalData}
          onClose={() => setModalData(null)}
          onSave={handleGuardar}
        />
      )}
      {onClose && (
        <button className="btn btn-secondary mt-2" onClick={onClose}>
          Cerrar
        </button>
      )}
    </div>
  );
}
