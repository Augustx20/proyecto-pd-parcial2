import connection from "../db.js";

export const registrarReserva = (req, res) => {
  const { id, titulo, genero, duracion } = req.body;
  const username = req.user.username;

  console.log("ID de la película recibido:", id);
  console.log("Usuario que reserva:", username);

  if (!id || !titulo || !username) {
    console.log("Datos incompletos.");
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const buscarUsuario = "SELECT id FROM usuarios WHERE username = ?";
  connection.query(buscarUsuario, [username], (err, userResults) => {
    if (err || userResults.length === 0) {
      console.log("Error al buscar usuario o usuario no encontrado.");
      return res.status(500).json({ success: false, message: "Error al obtener usuario" });
    }

    const usuarioId = userResults[0].id;

    const sqlReserva = "INSERT INTO reservas (usuario_id, pelicula_id) VALUES (?, ?)";
    connection.query(sqlReserva, [usuarioId, id], (err, result) => {
      if (err) {
        console.error("Error al registrar reserva:", err);
        return res.status(500).json({ success: false, message: "Error al registrar reserva" });
      }

      console.log("Reserva insertada correctamente, actualizando disponibilidad...");

      const sqlActualizar = "UPDATE peliculas SET disponible = 0 WHERE id = ?";
      connection.query(sqlActualizar, [id], (err, updateResult) => {
        if (err) {
          console.error("Error al actualizar disponibilidad:", err);
          return res.status(500).json({ success: false, message: "Error al actualizar disponibilidad" });
        }

        console.log(`Película con ID ${id} marcada como no disponible.`);
        res.json({ success: true });
      });
    });
  });
};

export const listarReservas = (req, res) => {
  const username = req.user.username;

  const buscarUsuario = "SELECT id FROM usuarios WHERE username = ?";
  connection.query(buscarUsuario, [username], (err, userResults) => {
    if (err || userResults.length === 0) {
      return res.status(500).json({ success: false, message: "Error al obtener usuario" });
    }

    const usuarioId = userResults[0].id;

    const sql = `
      SELECT reservas.id, peliculas.titulo, peliculas.genero, peliculas.duracion
      FROM reservas
      JOIN peliculas ON reservas.pelicula_id = peliculas.id
      WHERE reservas.usuario_id = ?
    `;
    connection.query(sql, [usuarioId], (err, results) => {
      if (err) {
        console.error("Error al obtener reservas:", err);
        return res.status(500).json({ success: false, message: "Error en el servidor" });
      }
      res.json(results);
    });
  });
};
export const cancelarReserva = (req, res) => {
  const reservaId = req.params.id;

  const obtenerPelicula = "SELECT pelicula_id FROM reservas WHERE id = ?";
  connection.query(obtenerPelicula, [reservaId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ success: false, message: "Error al obtener película" });
    }

    const peliculaId = results[0].pelicula_id;

    const eliminarReserva = "DELETE FROM reservas WHERE id = ?";
    connection.query(eliminarReserva, [reservaId], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error al eliminar reserva" });
      }

      const actualizarPelicula = "UPDATE peliculas SET disponible = 1 WHERE id = ?";
      connection.query(actualizarPelicula, [peliculaId], (err, updateResult) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Error al actualizar película" });
        }

        res.json({ success: true });
      });
    });
  });
};
