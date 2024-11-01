import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';

import { checkConnection } from './db.js';
dotenv.config();

const app = express();
app.disable('x-powered-by')
app.use(express.json());

checkConnection()

// Tus rutas y configuraciones aquí
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

