import { useState, useEffect } from "react";

const AdminPanel = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [duracion, setDuracion] = useState("");

  useEffect(() => {
    setPeliculas([
      { id: 1, titulo: 'Matrix', genero: 'Ciencia Ficción', duracion: 136 },
      { id: 2, titulo: 'El Padrino', genero: 'Drama', duracion: 175 },
      { id: 3, titulo: 'Interestelar', genero: 'Ciencia Ficción', duracion: 169 }
    ]);
  }, []);

  const eliminar = (id) => {
    if (confirm("¿Seguro que querés eliminar esta película?")) {
      setPeliculas(peliculas.filter(p => p.id !== id));
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
      setPeliculas([...peliculas, nuevaPelicula]);
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
