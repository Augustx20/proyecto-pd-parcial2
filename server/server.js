import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import peliculasRoutes from './routes/peliculasRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/peliculas', peliculasRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
