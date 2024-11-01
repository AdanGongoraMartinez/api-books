import db from '../db.js';

export const getAllGenres = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM generos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener generos' });
  }
};

export const getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM generos WHERE id = (:id)',
      args: { id }
    });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el genero' });
  }
};

export const createGenre = async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await db.execute({
      sql: 'INSERT INTO generos (nombre) VALUES (:nombre) RETURNING *',
      args: { nombre }
    });
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el genero' });
  }
};

