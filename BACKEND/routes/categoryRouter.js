const express = require('express');
const router = express.Router();

const { allCategoriesController, addCategoriesController, categoryDisplay } = require('../controllers/catogriesController');
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')

router.get('/', allCategoriesController);
router.post('/', jwtAdminMiddleware, addCategoriesController);
router.get('/category-display', categoryDisplay);

module.exports = router;