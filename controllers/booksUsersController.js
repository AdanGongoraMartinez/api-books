import db from '../db.js';

export const getAllBooksUsers = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM libros_usuarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener libros-usuarios' });
  }
};

export const getBooksById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM libros WHERE id = (:id)',
      args: { id }
    });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el libro' });
  }
};

export const createBook = async (req, res) => {
  const { titulo, autor_id, genero_id, año_publicacion, estado, descripcion } = req.body;
  try {
    const result = await db.execute({
      sql: 'INSERT INTO libros (titulo, autor_id, genero_id, año_publicacion, estado, descripcion) VALUES (:titulo, :autor_id, :genero_id, :año_publicacion, :estado, :descripcion) RETURNING *',
      args: { titulo, autor_id, genero_id, año_publicacion, estado, descripcion }
    });
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

