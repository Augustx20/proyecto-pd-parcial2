import jwt from "jsonwebtoken";

const SECRET_KEY = "secretoSuperSeguro123";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token faltante" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token inválido" });
  }
  
};
export const verificarAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Acceso denegado: Solo para administradores" });
  }
  next();
};

