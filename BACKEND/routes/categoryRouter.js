const express = require('express');
const router = express.Router();

const { allCategoriesController, addCategoriesController } = require('../controllers/catogriesController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')

router.get('/', allCategoriesController);
router.post('/', jwtAdminMiddleware, addCategoriesController);

module.exports = router;