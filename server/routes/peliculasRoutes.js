import express from 'express';
import { getPeliculas, agregarPelicula, eliminarPelicula } from '../controllers/peliculasController.js';

const router = express.Router();

router.get('/', getPeliculas);
router.post('/', agregarPelicula);
router.delete('/:id', eliminarPelicula);

export default router;
