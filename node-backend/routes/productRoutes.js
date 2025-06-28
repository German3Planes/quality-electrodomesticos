const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.post('/', productController.isAdmin, productController.create);
router.delete('/:id', productController.isAdmin, productController.remove);

module.exports = router;
