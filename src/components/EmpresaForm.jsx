import { useEffect, useState } from "react";

export default function EmpresaForm({ onSubmit, initialData = {} }) {
  const [form, setForm] = useState({
    nombre: initialData.nombre || "",
    rut: initialData.rut || "",
    direccion: initialData.direccion || "",
    comuna: initialData.comuna || "",
    email: initialData.email || "",
    telefono: initialData.telefono || "",
  });

  useEffect(() => {
    // Solo actualiza el formulario si initialData tiene algún valor (modo edición)
    if (Object.keys(initialData).length > 0) {
      setForm({
        nombre: initialData.nombre || "",
        rut: initialData.rut || "",
        direccion: initialData.direccion || "",
        comuna: initialData.comuna || "",
        email: initialData.email || "",
        telefono: initialData.telefono || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {["nombre", "rut", "direccion", "comuna", "email", "telefono"].map(
        (campo) => (
          <div className="mb-3" key={campo}>
            <label className="form-label">
              {campo[0].toUpperCase() + campo.slice(1)}
            </label>
            <input
              type="text"
              name={campo}
              className="form-control"
              value={form[campo]}
              onChange={handleChange}
              required={campo !== "telefono"}
            />
          </div>
        )
      )}
      <button type="submit" className="btn btn-primary">
        Guardar Empresa
      </button>
    </form>
  );
}
