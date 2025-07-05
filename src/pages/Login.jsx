import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondo from "../assets/Sala_de_cine.jpg"; // Ajustá el path según dónde tengas la imagen

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("loggedUser", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        navigate(data.user.role === "admin" ? "/adminpanel" : "/peliculas");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
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
        CineBron's
      </h1>

      <div className="card p-4 shadow" style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <h2 className="mb-3 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Usuario:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
