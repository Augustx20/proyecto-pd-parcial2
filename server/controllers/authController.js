
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" }
];

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign(
      { username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ success: true, user, token });
  } else {
    res.status(401).json({ success: false, message: "Credenciales inválidas" });
  }
};
