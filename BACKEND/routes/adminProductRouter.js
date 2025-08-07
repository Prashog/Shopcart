const express = require('express');
const router = express.Router();

const { createProductController, updateProductController, deleteProductController, getTopSellingProducts } = require('../controllers/adminProductsController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')

router.post('/', jwtAdminMiddleware, createProductController);
router.put('/:id', jwtAdminMiddleware, updateProductController);
router.delete('/:id', jwtAdminMiddleware, deleteProductController)
router.get('/top-selling', jwtAdminMiddleware, getTopSellingProducts);

module.exports = router;