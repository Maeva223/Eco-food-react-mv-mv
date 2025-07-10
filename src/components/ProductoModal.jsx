import React, { useState, useEffect } from "react";
import moment from "moment";

export default function ProductoModal({ producto, onClose, onSave }) {
  const [form, setForm] = useState(producto);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (moment(form.vencimiento).isBefore(moment())) {
      alert("La fecha de vencimiento no puede ser anterior a hoy");
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {form.id ? "Editar" : "Nuevo"} Producto
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
            />
            <textarea
              className="form-control mb-2"
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={handleChange}
            ></textarea>
            <label className="form-label">Fecha de vencimiento</label>
            <input
              className="form-control mb-2"
              name="vencimiento"
              type="date"
              value={form.vencimiento}
              onChange={handleChange}
            />
            <label className="form-label">Cantidad de productos</label>
            <input
              className="form-control mb-2"
              name="cantidad"
              type="number"
              min={0}
              value={form.cantidad}
              onChange={(e) => {
                const val = Math.max(0, Number(e.target.value));
                setForm({ ...form, cantidad: val });
              }}
              placeholder="Cantidad de productos"
            />
            <label className="form-label">Precio</label>
            <input
              className="form-control mb-2"
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
              placeholder="Precio"
            />
            <select
              className="form-select"
              name="estado"
              value={form.estado}
              onChange={handleChange}
            >
              <option value="disponible">Disponible</option>
              <option value="por vencer">Por vencer</option>
              <option value="vencido">Vencido</option>
            </select>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
