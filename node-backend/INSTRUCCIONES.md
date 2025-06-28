# Instrucciones para el backend Node.js (MVC)

1. Ve a la carpeta `node-backend`:
   ```sh
   cd node-backend
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Asegúrate de que el archivo `../data/admin.json` existe y contiene:
   ```json
   {
     "username": "admin",
     "passwordHash": "$1234$"
   }
   ```
   (La contraseña para login es: 1234)

4. Inicia el servidor:
   ```sh
   npm start
   ```
   El backend estará disponible en: `http://localhost:3001`

5. Endpoints principales:
   - **Login:**
     - POST `/api/admin/login`  (body: `{ "username": "admin", "password": "1234" }`)
   - **Logout:**
     - POST `/api/admin/logout`
   - **Listar productos:**
     - GET `/api/products`
   - **Crear producto:** (requiere login admin)
     - POST `/api/products` (body: `{ "name": "...", "description": "...", "price": 100 }`)
   - **Eliminar producto:** (requiere login admin)
     - DELETE `/api/products/:id`

Puedes probar con Postman, Insomnia o fetch/AJAX desde el frontend.

¿Te gustaría que agregue la conexión con el frontend o alguna funcionalidad extra?
