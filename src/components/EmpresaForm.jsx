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
              type={
                campo === "telefono"
                  ? "tel"
                  : campo === "email"
                  ? "email"
                  : "text"
              }
              name={campo}
              className="form-control"
              value={form[campo]}
              onChange={
                campo === "telefono"
                  ? (e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.startsWith("569")) val = val.slice(3); // Evita duplicar el prefijo
                      if (val.length > 8) val = val.slice(0, 8);
                      setForm({
                        ...form,
                        telefono: "+569" + val,
                      });
                    }
                  : handleChange
              }
              required={campo !== "telefono"}
              pattern={
                campo === "telefono"
                  ? "\\+569\\d{8}"
                  : campo === "email"
                  ? "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
                  : undefined
              }
              minLength={campo === "telefono" ? 12 : undefined}
              maxLength={
                campo === "telefono"
                  ? 12
                  : campo === "nombre"
                  ? 20
                  : campo === "email"
                  ? 40
                  : undefined
              }
              placeholder={
                campo === "telefono"
                  ? "+569XXXXXXXX"
                  : campo === "email"
                  ? "ejemplo@correo.com"
                  : undefined
              }
              readOnly={campo === "telefono" ? false : undefined}
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
