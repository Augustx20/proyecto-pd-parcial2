import express from 'express';
import { getPeliculas, agregarPelicula, eliminarPelicula } from '../controllers/peliculasController.js';
import { verificarToken, verificarAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, getPeliculas);
router.post('/', verificarToken, verificarAdmin, agregarPelicula);
router.delete('/:id', verificarToken, verificarAdmin, eliminarPelicula);

export default router;
