import db from '../db.js';

export const getAllAuthors = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM autores');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener autores' });
  }
};

export const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM autores WHERE id = (:id)',
      args: { id }
    });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el autor' });
  }
};

export const createAuthor = async (req, res) => {
  const { nombre, nacionalidad, fecha_nacimiento } = req.body;
  try {
    const result = await db.execute({
      sql: 'INSERT INTO autores ( nombre, nacionalidad, fecha_nacimiento ) VALUES ( :nombre, :nacionalidad, :fecha_nacimiento ) RETURNING *',
      args: { nombre, nacionalidad, fecha_nacimiento }
    });
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el author' });
  }
};

