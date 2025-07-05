import jwt from "jsonwebtoken";
import connection from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    const user = results[0];

    console.log("Datos del usuario:", user);
    console.log("SECRET_KEY:", SECRET_KEY);

    if (!SECRET_KEY) {
      console.error("SECRET_KEY no definida, verifique su archivo .env");
      return res.status(500).json({ success: false, message: "Error en configuración del servidor" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ success: true, user: { username: user.username, role: user.role }, token });
  });
};
export const register = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: "Datos incompletos" });
  }

  const sql = "INSERT INTO usuarios (username, password, role) VALUES (?, ?, ?)";
  connection.query(sql, [username, password, role], (err, results) => {
    if (err) {
      console.error("Error al registrar usuario:", err);
      return res.status(500).json({ success: false, message: "Error en el servidor" });
    }

    res.json({ success: true, message: "Usuario registrado exitosamente" });
  });
};
