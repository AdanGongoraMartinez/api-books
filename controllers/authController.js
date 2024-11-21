import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import db from '../db.js';

export const register = async (req, res) => {
    const { nombre, email, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    try {
        const result = await db.execute({
            sql: 'INSERT INTO usuarios (nombre, email, contraseña) VALUES (:nombre, :email, :hashedPassword) RETURNING *',
            args: { nombre, email, hashedPassword }
        });
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

export const login = async (req, res) => {
    const { email, contraseña } = req.body;

    try {
        const result = await db.execute({
            sql: 'SELECT * FROM usuarios WHERE email = (:email)',
            args: { email }
        });
        const user = result.rows[0];

        if (user && (await bcrypt.compare(contraseña, user.contraseña))) {
            // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            // res.json({ token });
            res.status(200).json({ "success": true, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
        } else {
            res.status(400).json({ "success": false, error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.log(error.message)
        console.log(req.body)
        res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
};

