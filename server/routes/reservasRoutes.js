import express from 'express';
import { registrarReserva, listarReservas } from '../controllers/reservasController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, registrarReserva);
router.get('/', verificarToken, listarReservas);

export default router;
