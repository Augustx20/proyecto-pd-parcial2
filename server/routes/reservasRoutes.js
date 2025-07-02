import express from "express";
import { listarReservas, cancelarReserva } from "../controllers/reservasController.js";
import {verificarToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verificarToken, listarReservas);
router.delete("/:id", verificarToken, cancelarReserva);

export default router;
