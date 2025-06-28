const productModel = require('../models/productModel');

function isAdmin(req, res, next) {
    if (req.session && req.session.isAdmin) return next();
    res.status(403).json({ message: 'No autorizado' });
}

function getAll(req, res) {
    res.json(productModel.getAll());
}

function create(req, res) {
    const { name, description, price } = req.body;
    if (!name || !description || typeof price !== 'number') {
        return res.status(400).json({ message: 'Datos inválidos' });
    }
    const product = productModel.create({ name, description, price });
    res.json(product);
}

function remove(req, res) {
    const id = parseInt(req.params.id);
    if (productModel.remove(id)) {
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
}

module.exports = { isAdmin, getAll, create, remove };
