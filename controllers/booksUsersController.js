import db from '../db.js';

export const getAllBooksUsers = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM libros_usuarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros_usuarios' });
  }
};

export const getBooksUsersById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM libros_usuarios WHERE id = (:id)',
      args: { id }
    });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro_usuario' });
  }
};

export const createBookUsers = async (req, res) => {
  const { usuario_id, libro_id, estado, fecha_agregado } = req.body;
  try {
    const result = await db.execute({
      sql: 'INSERT INTO libros_usuarios (usuario_id, libro_id, estado, fecha_agregado) VALUES (:usuario_id, :libro_id, :estado, :fecha_agregado) RETURNING *',
      args: { usuario_id, libro_id, estado, fecha_agregado }
    });
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear el libro_usuario' });
  }
};

