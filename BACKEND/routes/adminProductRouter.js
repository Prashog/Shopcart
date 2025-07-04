const express = require('express');
const router = express.Router();

const { createProductController, updateProductController, deleteProductController } = require('../controllers/adminProductsController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')

router.post('/', jwtAdminMiddleware, createProductController);
router.put('/:id', jwtAdminMiddleware, updateProductController);
router.delete('/:id', jwtAdminMiddleware, deleteProductController)

module.exports = router;