const adminModel = require('../models/adminModel');

function login(req, res) {
    const { username, password } = req.body;
    const admin = adminModel.getAdmin();
    if (username === admin.username && adminModel.verifyPassword(password, admin.passwordHash)) {
        req.session.isAdmin = true;
        return res.json({ message: 'Login exitoso' });
    }
    res.status(401).json({ message: 'Credenciales incorrectas' });
}

function logout(req, res) {
    req.session.destroy(() => {
        res.json({ message: 'Sesión cerrada' });
    });
}

module.exports = { login, logout };
