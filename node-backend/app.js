const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const { loginLimiter, csrfProtection } = require('./middleware/security');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(session({
    secret: 'quality_secret',
    resave: false,
    saveUninitialized: true
}));

// Protección CSRF solo para métodos POST, PUT, DELETE
app.use((req, res, next) => {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
        return csrfProtection(req, res, next);
    }
    next();
});

app.use('/api/admin', loginLimiter, adminRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor Node.js escuchando en http://localhost:${PORT}`);
});
