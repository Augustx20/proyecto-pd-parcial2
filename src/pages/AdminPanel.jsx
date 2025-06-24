import { useState, useEffect } from "react";

const AdminPanel = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");

  useEffect(() => {
    const storedPeliculas = JSON.parse(localStorage.getItem("peliculas")) || [];
    setPeliculas(storedPeliculas);
  }, []);

  const eliminar = (id) => {
    if (confirm("¿Seguro que querés eliminar esta película?")) {
      const nuevasPeliculas = peliculas.filter(p => p.id !== id);
      setPeliculas(nuevasPeliculas);
      localStorage.setItem("peliculas", JSON.stringify(nuevasPeliculas));
    }
  };

  const agregarPelicula = (e) => {
    e.preventDefault();
    if (titulo && genero && duracion) {
      const nuevaPelicula = {
        id: Date.now(),
        titulo,
        genero,
        duracion: parseInt(duracion)
      };
      const nuevasPeliculas = [...peliculas, nuevaPelicula];
      setPeliculas(nuevasPeliculas);
      localStorage.setItem("peliculas", JSON.stringify(nuevasPeliculas));
      setTitulo("");
      setGenero("");
      setDuracion("");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Panel de Administración</h2>

      <h3>Agregar Nueva Película</h3>
      <form onSubmit={agregarPelicula} style={{ marginBottom: '2rem' }}>
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
          <li key={peli.id} style={{ marginBottom: '1rem' }}>
            <strong>{peli.titulo}</strong> ({peli.genero}) - {peli.duracion} min
            <button onClick={() => eliminar(peli.id)} style={{ marginLeft: '1rem' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;