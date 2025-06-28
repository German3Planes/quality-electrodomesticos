# Seguridad aplicada al backend Node.js

- Las contraseñas de admin se verifican usando bcrypt (hash en admin.json).
- El login está protegido con rate limit (máx. 5 intentos cada 15 minutos por IP).
- Todas las rutas POST/PUT/DELETE están protegidas con tokens CSRF.
- Solo el admin autenticado puede crear o eliminar productos (middleware isAdmin).

## Instalación de dependencias adicionales

Desde la carpeta `node-backend` ejecuta:

```
npm install bcrypt express-rate-limit csurf
```

## Notas sobre el hash de contraseña

Para generar un hash bcrypt para tu admin.json, puedes usar este script Node.js:

```js
const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('1234', 10);
console.log(hash);
```

Luego reemplaza el valor de "passwordHash" en admin.json por el hash generado.

---
¿Necesitas ayuda para conectar el frontend o para generar el hash bcrypt?
