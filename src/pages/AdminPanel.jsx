import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const [peliculas, setPeliculas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");
  const [cantidadButacas, setCantidadButacas] = useState("");

  useEffect(() => {
    fetchPeliculas();
  }, []);

  const fetchPeliculas = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/peliculas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setPeliculas(data);
    } catch (err) {
      console.error("Error al obtener películas:", err);
    }
  };

  const agregarPelicula = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/peliculas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          genero,
          duracion: parseInt(duracion),
          cantidad_butacas: parseInt(cantidadButacas),
        }),
      });

      if (response.ok) {
        fetchPeliculas();
        setTitulo("");
        setGenero("");
        setDuracion("");
        setCantidadButacas("");
      } else {
        console.error("Error al agregar película");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const eliminarPelicula = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/peliculas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchPeliculas();
      }
    } catch (err) {
      console.error("Error al eliminar película:", err);
    }
  };

  return (
    <div className="container mt-4">
      <Navbar />

      <h2 className="mb-4">Panel de Administrador</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Agregar Película</h4>

          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Género</label>
            <input
              type="text"
              className="form-control"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Duración (minutos)</label>
            <input
              type="number"
              className="form-control"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Cantidad de Butacas</label>
            <input
              type="number"
              className="form-control"
              value={cantidadButacas}
              onChange={(e) => setCantidadButacas(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={agregarPelicula}>
            Agregar Película
          </button>
        </div>
      </div>

      <h4>Películas Cargadas</h4>
      <ul className="list-group">
        {peliculas.map((peli) => (
          <li key={peli.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{peli.titulo}</strong> ({peli.genero}) - {peli.duracion} min
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => eliminarPelicula(peli.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
