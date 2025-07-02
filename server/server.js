import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import peliculasRoutes from './routes/peliculasRoutes.js';
import reservasRoutes from './routes/reservasRoutes.js';



const app = express();
app.use(cors());
console.log("SECRET_KEY:", process.env.SECRET_KEY);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/peliculas', peliculasRoutes);
app.use('/api/reservas', reservasRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
