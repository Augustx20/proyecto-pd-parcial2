import connection from "../db.js";

export const getPeliculas = (req, res) => {
  connection.query("SELECT * FROM peliculas", (err, results) => {
    if (err) {
      console.error("Error al obtener películas:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }
    res.json(results);
  });
};

export const agregarPelicula = (req, res) => {
  const { titulo, genero, duracion } = req.body;

  if (!titulo || !genero || !duracion) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const sql = "INSERT INTO peliculas (titulo, genero, duracion) VALUES (?, ?, ?)";
  connection.query(sql, [titulo, genero, duracion], (err, result) => {
    if (err) {
      console.error("Error al agregar película:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }
    res.json({ success: true, id: result.insertId });
  });
};

export const eliminarPelicula = (req, res) => {
  const id = parseInt(req.params.id);

  const sql = "DELETE FROM peliculas WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar película:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }
    res.json({ success: true });
  });
};
