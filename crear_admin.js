// Script para crear un usuario admin en PostgreSQL con contraseña hasheada
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'productos_db',
  password: 'tu_contraseña',
  port: 5432,
});

async function crearAdmin() {
  const nombre = 'admin';
  const email = 'admin@admin.com';
  const contraseña = '1234';
  const hash = await bcrypt.hash(contraseña, 10);
  try {
    await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, es_admin) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
      [nombre, email, hash, true]
    );
    console.log('Usuario admin creado o ya existente');
  } catch (err) {
    console.error('Error al crear admin:', err);
  } finally {
    await pool.end();
  }
}

crearAdmin();
