import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // por defecto es "user"
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
        setTimeout(() => navigate("/"), 2000);
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
    <div style={{ padding: "2rem" }}>
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Usuario: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rol: </label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;
