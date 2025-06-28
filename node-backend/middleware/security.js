const rateLimit = require('express-rate-limit');
const csrf = require('csurf');

// Rate limiter para login
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // máximo 5 intentos por IP
    message: 'Demasiados intentos de login, intenta más tarde.'
});

// CSRF protection
const csrfProtection = csrf({ cookie: false });

module.exports = { loginLimiter, csrfProtection };
