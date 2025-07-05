import express from "express";
import { getPeliculas, agregarPelicula, eliminarPelicula } from "../controllers/peliculasController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todos los usuarios autenticados pueden ver las películas
router.get("/", verificarToken, getPeliculas);

// Solo admin puede agregar películas
router.post("/", verificarToken, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Acceso denegado" });
  }
  next();
}, agregarPelicula);

// Solo admin puede eliminar películas
router.delete("/:id", verificarToken, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Acceso denegado" });
  }
  next();
}, eliminarPelicula);

export default router;
