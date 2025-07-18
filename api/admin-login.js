const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} no permitido`);
  }
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
    // Aquí podrías generar un token o sesión (ejemplo: JWT)
    return res.status(200).json({ message: 'Login exitoso', admin: true, nombre: user.nombre });
  } catch (err) {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
