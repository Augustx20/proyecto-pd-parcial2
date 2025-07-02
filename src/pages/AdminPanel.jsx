import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const [peliculas, setPeliculas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedUser");
        navigate("/");
      } else {
        fetchPeliculas();
      }
    } else {
      navigate("/");
    }
  }, []);

  const fetchPeliculas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/peliculas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPeliculas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarPelicula = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/peliculas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchPeliculas();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const agregarPelicula = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/peliculas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, genero, duracion }),
      });

      if (response.ok) {
        setTitulo("");
        setGenero("");
        setDuracion("");
        fetchPeliculas();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Panel de Administrador</h2>

      <h3>Agregar Película</h3>
      <form onSubmit={agregarPelicula} style={{ marginBottom: "2rem" }}>
        <div>
          <label>Título: </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Género: </label>
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duración (min): </label>
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <h3>Cartelera</h3>
      <ul>
        {peliculas.map((peli) => (
          <li key={peli.id} style={{ marginBottom: "1rem" }}>
            <strong>{peli.titulo}</strong> ({peli.genero}) - {peli.duracion} min
            <button onClick={() => eliminarPelicula(peli.id)} style={{ marginLeft: "1rem" }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
