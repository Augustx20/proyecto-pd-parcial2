import connection from "../db.js";

export const listarReservas = (req, res) => {
  const username = req.user.username;

  const buscarUsuario = "SELECT id FROM usuarios WHERE username = ?";
  connection.query(buscarUsuario, [username], (err, userResults) => {
    if (err || userResults.length === 0) {
      return res.status(500).json({ success: false, message: "Error al obtener usuario" });
    }

    const usuarioId = userResults[0].id;

    const sql = `
      SELECT r.id, p.titulo, COUNT(rb.id) AS cantidad_butacas
      FROM reservas r
      JOIN peliculas p ON r.pelicula_id = p.id
      LEFT JOIN reserva_butacas rb ON rb.reserva_id = r.id
      WHERE r.usuario_id = ?
      GROUP BY r.id, p.titulo
    `;

    connection.query(sql, [usuarioId], (err, results) => {
      if (err) {
        console.error("Error al listar reservas:", err);
        return res.status(500).json({ success: false, message: "Error al obtener reservas" });
      }

      res.json(results);
    });
  });
};

export const cancelarReserva = (req, res) => {
  const reservaId = req.params.id;

  // 1. Obtener las butacas asociadas a la reserva
  const obtenerButacas = "SELECT butaca_id, pelicula_id FROM reserva_butacas rb JOIN butacas b ON rb.butaca_id = b.id WHERE rb.reserva_id = ?";
  connection.query(obtenerButacas, [reservaId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ success: false, message: "Error al obtener butacas" });
    }

    const butacasIds = results.map((b) => b.butaca_id);
    const peliculaId = results[0].pelicula_id;

    // 2. Liberar esas butacas
    const liberarButacas = "UPDATE butacas SET ocupada = 0 WHERE id IN (?)";
    connection.query(liberarButacas, [butacasIds], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error al liberar butacas" });
      }

      // 3. Eliminar la asociación de butacas
      const eliminarAsociacion = "DELETE FROM reserva_butacas WHERE reserva_id = ?";
      connection.query(eliminarAsociacion, [reservaId], (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: "Error al eliminar asociación" });
        }

        // 4. Eliminar la reserva
        const eliminarReserva = "DELETE FROM reservas WHERE id = ?";
        connection.query(eliminarReserva, [reservaId], (err) => {
          if (err) {
            return res.status(500).json({ success: false, message: "Error al eliminar reserva" });
          }

          // 5. Verificar si la película estaba marcada como no disponible
          const verificarButacas = "SELECT COUNT(*) AS disponibles FROM butacas WHERE pelicula_id = ? AND ocupada = 0";
          connection.query(verificarButacas, [peliculaId], (err, results) => {
            if (err) {
              return res.status(500).json({ success: false, message: "Error al verificar disponibilidad" });
            }

            const disponibles = results[0].disponibles;

            if (disponibles > 0) {
              // Hay butacas libres, marcar película como disponible
              const actualizarPelicula = "UPDATE peliculas SET disponible = 1 WHERE id = ?";
              connection.query(actualizarPelicula, [peliculaId], (err) => {
                if (err) {
                  return res.status(500).json({ success: false, message: "Error al actualizar disponibilidad" });
                }
                res.json({ success: true, mensaje: "Reserva cancelada, película disponible nuevamente." });
              });
            } else {
              // Sigue sin butacas disponibles
              res.json({ success: true, mensaje: "Reserva cancelada." });
            }
          });
        });
      });
    });
  });
};
