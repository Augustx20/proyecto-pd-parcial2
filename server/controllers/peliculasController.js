import connection from "../db.js";

export const getPeliculas = (req, res) => {
  const sql = "SELECT * FROM peliculas";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error al obtener películas" });
    }
    res.json(results);
  });
};

export const agregarPelicula = (req, res) => {
  let { titulo, genero, duracion, cantidad_butacas } = req.body;

  cantidad_butacas = parseInt(cantidad_butacas);
  if (!titulo || !genero || !duracion || isNaN(cantidad_butacas) || cantidad_butacas <= 0) {
    return res.status(400).json({ success: false, message: "Datos incompletos o inválidos" });
  }

  console.log("Cantidad de butacas recibida:", cantidad_butacas);

  const sql = "INSERT INTO peliculas (titulo, genero, duracion, disponible) VALUES (?, ?, ?, 1)";
  connection.query(sql, [titulo, genero, duracion], (err, result) => {
    if (err) {
      console.error("Error al agregar película:", err);
      return res.status(500).json({ success: false, message: "Error al agregar película" });
    }

    const peliculaId = result.insertId;

    const butacas = [];
    for (let i = 1; i <= cantidad_butacas; i++) {
      butacas.push([peliculaId, i]);
    }

    console.log("Array de butacas generado:", butacas);

    const sqlButacas = "INSERT INTO butacas (pelicula_id, numero_butaca) VALUES ?";
    connection.query(sqlButacas, [butacas], (err) => {
      if (err) {
        console.error("Error al generar butacas:", err);
        return res.status(500).json({ success: false, message: "Error al generar butacas" });
      }

      res.json({ success: true, message: "Película y butacas agregadas correctamente" });
    });
  });
};


export const eliminarPelicula = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM peliculas WHERE id = ?";
  connection.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Error al eliminar película" });
    }
    res.json({ success: true });
  });
};
