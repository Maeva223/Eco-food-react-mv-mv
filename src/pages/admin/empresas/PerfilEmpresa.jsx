import React, { useState, useEffect } from "react";
import { getEmpresaByUID, updateEmpresa } from "../../services/empresaService";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";

export default function PerfilEmpresa() {
  const { user } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmpresaByUID(user.uid);
      setPerfil(data);
      setForm(data);
    };
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const guardarCambios = async () => {
    await updateEmpresa(user.uid, form);
    Swal.fire("Actualizado", "Perfil actualizado con éxito", "success");
    setEditando(false);
  };

  if (!perfil) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>Perfil de Empresa</h2>
      <div className="mb-3">
        <label>Nombre</label>
        <input
          disabled={!editando}
          value={form.nombre}
          name="nombre"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Correo</label>
        <input disabled value={form.email} className="form-control" />
      </div>
      <div className="mb-3">
        <label>Dirección</label>
        <input
          disabled={!editando}
          value={form.direccion}
          name="direccion"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Comuna</label>
        <input
          disabled={!editando}
          value={form.comuna}
          name="comuna"
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {editando ? (
        <button className="btn btn-success" onClick={guardarCambios}>
          Guardar
        </button>
      ) : (
        <button className="btn btn-primary" onClick={() => setEditando(true)}>
          Editar
        </button>
      )}
    </div>
  );
}
