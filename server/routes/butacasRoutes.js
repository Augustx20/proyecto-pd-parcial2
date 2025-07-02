import express from "express";
import { obtenerButacas, reservarButacas } from "../controllers/butacasController.js";
import {verificarToken} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", verificarToken, obtenerButacas);
router.post("/reservar", verificarToken, reservarButacas);

export default router;
