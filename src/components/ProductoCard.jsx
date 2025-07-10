import React from "react";
import Swal from "sweetalert2";
import moment from "moment";

export default function ProductoCard({ producto, onEdit, onDelete }) {
  const vencimiento = moment(producto.vencimiento);
  const hoy = moment();
  const diasRestantes = vencimiento.diff(hoy, "days");

  const alerta = diasRestantes <= 3 ? "text-danger" : "";

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p className={`card-text ${alerta}`}>
          Vence: {vencimiento.format("YYYY-MM-DD")}
        </p>
        <p className="card-text">Cantidad: {producto.cantidad}</p>
        <p className="card-text">
          Precio: {producto.precio === 0 ? "Gratuito" : `$${producto.precio}`}
        </p>
        <p className="card-text">
          <strong>Estado:</strong> {producto.estado}
        </p>
        {/* Only show Edit and Delete buttons if the corresponding props are provided */}
        {onEdit && (
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(producto)}
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              Swal.fire({
                title: "¿Eliminar producto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
              }).then((res) => {
                if (res.isConfirmed) onDelete(producto.id);
              });
            }}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
