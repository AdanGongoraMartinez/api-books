import db from '../db.js';

export const getAllUsers = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM usuarios WHERE id = (:id)',
      args: { id }
    });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

