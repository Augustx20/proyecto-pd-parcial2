import connection from "../db.js";

export const obtenerButacas = (req, res) => {
  const peliculaId = req.params.id;

  const sql = "SELECT id, numero_butaca, ocupada FROM butacas WHERE pelicula_id = ?";
  connection.query(sql, [peliculaId], (err, results) => {
    if (err) {
      console.error("Error al obtener butacas:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }

    res.json(results);
  });
};

export const reservarButacas = (req, res) => {
  const { butacas, peliculaId } = req.body;
  const username = req.user.username;

  if (!butacas || !Array.isArray(butacas) || butacas.length === 0 || !peliculaId) {
    return res.status(400).json({ success: false, message: "Datos inválidos" });
  }

  // Paso 1: Obtener el ID del usuario
  const buscarUsuario = "SELECT id FROM usuarios WHERE username = ?";
  connection.query(buscarUsuario, [username], (err, userResults) => {
    if (err || userResults.length === 0) {
      return res.status(500).json({ success: false, message: "Error al obtener usuario" });
    }

    const usuarioId = userResults[0].id;

    // Paso 2: Insertar en tabla reservas
    const sqlReserva = "INSERT INTO reservas (usuario_id, pelicula_id) VALUES (?, ?)";
    connection.query(sqlReserva, [usuarioId, peliculaId], (err, result) => {
      if (err) {
        console.error("Error al registrar reserva:", err);
        return res.status(500).json({ success: false, message: "Error al registrar reserva" });
      }

      const reservaId = result.insertId;

      // Paso 3: Asociar las butacas a la reserva
      const valores = butacas.map((butacaId) => [reservaId, butacaId]);
      const sqlButacas = "INSERT INTO reserva_butacas (reserva_id, butaca_id) VALUES ?";

      connection.query(sqlButacas, [valores], (err) => {
        if (err) {
          console.error("Error al asociar butacas:", err);
          return res.status(500).json({ success: false, message: "Error al asociar butacas" });
        }

        // Paso 4: Marcar las butacas como ocupadas
        const sqlActualizar = `UPDATE butacas SET ocupada = 1 WHERE id IN (${butacas.map(() => "?").join(",")})`;

        connection.query(sqlActualizar, butacas, (err) => {
          if (err) {
            console.error("Error al actualizar butacas:", err);
            return res.status(500).json({ success: false, message: "Error al actualizar butacas" });
          }

          // Paso 5: Verificar si ya no quedan butacas libres
          const sqlDisponibles = "SELECT COUNT(*) AS disponibles FROM butacas WHERE pelicula_id = ? AND ocupada = 0";
          connection.query(sqlDisponibles, [peliculaId], (err, disponiblesResults) => {
            if (err) {
              console.error("Error al verificar disponibilidad:", err);
              return res.status(500).json({ success: false, message: "Error al verificar disponibilidad" });
            }

            const disponibles = disponiblesResults[0].disponibles;

            if (disponibles === 0) {
              // Todas las butacas ocupadas, marcar película como no disponible
              const sqlNoDisponible = "UPDATE peliculas SET disponible = 0 WHERE id = ?";
              connection.query(sqlNoDisponible, [peliculaId], (err) => {
                if (err) {
                  console.error("Error al actualizar disponibilidad de la película:", err);
                  return res.status(500).json({ success: false, message: "Error al actualizar disponibilidad" });
                }
                res.json({ success: true, mensaje: "Reserva confirmada, película agotada." });
              });
            } else {
              res.json({ success: true, mensaje: "Reserva confirmada." });
            }
          });
        });
      });
    });
  });
};
