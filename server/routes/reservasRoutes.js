import express from 'express';
import { registrarReserva, listarReservas } from '../controllers/reservasController.js';

const router = express.Router();

router.post('/', registrarReserva);
router.get('/', listarReservas);

export default router;
