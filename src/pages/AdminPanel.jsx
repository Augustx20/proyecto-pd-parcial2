import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const [peliculas, setPeliculas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");

  useEffect(() => {
    fetchPeliculas();
  }, []);

  const fetchPeliculas = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/peliculas");
      const data = await response.json();
      setPeliculas(data);
    } catch (err) {
      console.error(err);
    }
  };

  const agregarPelicula = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/peliculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, genero, duracion: parseInt(duracion) }),
      });
      const data = await response.json();
      setPeliculas(data);
      setTitulo("");
      setGenero("");
      setDuracion("");
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarPelicula = async (id) => {
    if (confirm("¿Seguro que querés eliminar esta película?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/peliculas/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        setPeliculas(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Panel de Administración</h2>

      <h3>Agregar Nueva Película</h3>
      <form onSubmit={agregarPelicula} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Género"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duración (min)"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          required
        />
        <button type="submit">Agregar</button>
      </form>

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