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

    console.log("Cantidad de butacas enviada:", cantidadButacas); // VERIFICACIÓN

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
        cantidad_butacas: parseInt(cantidadButacas), // aseguramos que sea número
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
    <div style={{ padding: "2rem" }}>
      <Navbar />
      <h2>Panel de Administrador</h2>

      <h3>Agregar Película</h3>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Género"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
      />
      <input
        type="number"
        placeholder="Duración (min)"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad de butacas"
        value={cantidadButacas}
        onChange={(e) => setCantidadButacas(e.target.value)}
      />
      <button onClick={agregarPelicula}>Agregar</button>

      <h3>Películas</h3>
      <ul>
        {peliculas.map((peli) => (
          <li key={peli.id}>
            {peli.titulo} ({peli.genero}) - {peli.duracion} min
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
