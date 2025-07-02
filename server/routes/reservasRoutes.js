import express from 'express';
import { registrarReserva, listarReservas, cancelarReserva } from '../controllers/reservasController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, registrarReserva);
router.get('/', verificarToken, listarReservas);
router.delete("/:id", verificarToken, cancelarReserva);

export default router;
