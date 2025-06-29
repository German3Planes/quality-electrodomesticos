const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

// Middleware para headers CORS extra (opcional, pero ayuda con preflight)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'productos_db',
  password: 'tu_contraseña',
  port: 5432,
});

// Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error al obtener productos');
  }
});

// Crear producto
app.post('/productos', async (req, res) => {
  const { nombre, descripcion, precio, image } = req.body;
  if (!nombre || !descripcion || isNaN(Number(precio))) {
    return res.status(400).send('Datos inválidos');
  }
  try {
    await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, image) VALUES ($1, $2, $3, $4)',
      [nombre, descripcion, precio, image]
    );
    res.send('Producto creado');
  } catch (err) {
    res.status(500).send('Error al insertar producto');
  }
});

// Modificar producto
app.put('/productos/:id', async (req, res) => {
  const { nombre, descripcion, precio, image } = req.body;
  const { id } = req.params;
  try {
    await pool.query(
      'UPDATE productos SET nombre=$1, descripcion=$2, precio=$3, image=$4 WHERE id=$5',
      [nombre, descripcion, precio, image, id]
    );
    res.send('Producto actualizado');
  } catch (err) {
    res.status(500).send('Error al actualizar producto');
  }
});

// Eliminar producto
app.delete('/productos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM productos WHERE id=$1', [id]);
    res.send('Producto eliminado');
  } catch (err) {
    res.status(500).send('Error al eliminar producto');
  }
});

// Login de admin usando PostgreSQL
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.contraseña);
    if (!valid || !user.es_admin) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }
    // Aquí podrías generar un token o sesión
    res.json({ message: 'Login exitoso', admin: true, nombre: user.nombre });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
