import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../services/firebase";
import Swal from "sweetalert2";
import { getUserData } from "../services/userService";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const cred = await signInWithEmailAndPassword(auth, email, password);

      if (!cred.user.emailVerified) {
        Swal.fire(
          "Correo no verificado",
          "Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada.",
          "info"
        );
        return;
      }

      const datos = await getUserData(cred.user.uid);
      console.log("Bienvenido", datos.nombre, "Tipo:", datos.tipo);

      // Redirección según tipo de usuario
      if (datos.tipo === "admin") {
        navigate("/admin/empresas");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Credenciales incorrectas", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-3">
        <a href="/recuperar">¿Olvidaste tu contraseña?</a>
      </p>
      <p className="mt-3">
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
}
