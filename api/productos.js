const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM productos ORDER BY id');
      return res.status(200).json(result.rows);
    } catch (err) {
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
  }
  if (req.method === 'POST') {
    const { nombre, descripcion, precio, image } = req.body;
    if (!nombre || !descripcion || isNaN(Number(precio))) {
      return res.status(400).json({ error: 'Datos inválidos' });
    }
    try {
      await pool.query(
        'INSERT INTO productos (nombre, descripcion, precio, image) VALUES ($1, $2, $3, $4)',
        [nombre, descripcion, precio, image]
      );
      return res.status(201).json({ message: 'Producto creado' });
    } catch (err) {
      return res.status(500).json({ error: 'Error al insertar producto' });
    }
  }
  if (req.method === 'PUT') {
    const { id, nombre, descripcion, precio, image } = req.body;
    if (!id) return res.status(400).json({ error: 'ID requerido' });
    try {
      await pool.query(
        'UPDATE productos SET nombre=$1, descripcion=$2, precio=$3, image=$4 WHERE id=$5',
        [nombre, descripcion, precio, image, id]
      );
      return res.status(200).json({ message: 'Producto actualizado' });
    } catch (err) {
      return res.status(500).json({ error: 'Error al actualizar producto' });
    }
  }
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'ID requerido' });
    try {
      await pool.query('DELETE FROM productos WHERE id=$1', [id]);
      return res.status(200).json({ message: 'Producto eliminado' });
    } catch (err) {
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Método ${req.method} no permitido`);
};
