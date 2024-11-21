import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import genreRoutes from './routes/genreRoutes.js'
import authorRoutes from './routes/authorRoutes.js'
import booksUsersRoutes from './routes/booksUsersRoutes.js'

//import { checkConnection } from './db.js';
dotenv.config();

const app = express();
app.disable('x-powered-by')

// Configuración básica (permitir todas las solicitudes)
// app.use(cors({
//     origin: 'http://localhost:4200', // Cambia al dominio de tu frontend
//     methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
// }));

// Middleware para manejar solicitudes OPTIONS
app.options('*', cors());

//checkConnection()

app.use(express.json());

// Tus rutas y configuraciones aquí
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/books', bookRoutes);
app.use('/genres', genreRoutes);
app.use('/authors', authorRoutes);
app.use('/booksUsers', booksUsersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

