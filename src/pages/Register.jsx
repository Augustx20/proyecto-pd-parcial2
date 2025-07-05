import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../assets/Sala_de_cine.jpg"; // Ajustá el path según dónde tengas la imagen

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registro exitoso, ahora podés iniciar sesión");
        setError("");
        setTimeout(() => navigate("/Login"), 2000);
      } else {
        setError(data.message || "Error al registrarse");
        setSuccess("");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      setSuccess("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-white mb-4 shadow" style={{ textShadow: "2px 2px 4px black" }}>
        Bienvenido a CineBron's
      </h1>

      <div className="card p-4 shadow" style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <h2 className="mb-3 text-center">Registrarse</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button type="submit" className="btn btn-primary w-100">Registrarse</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
