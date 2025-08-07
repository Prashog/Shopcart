const express = require('express')
const router = express.Router();

const { getAllUsersController, toggleUserAccessController } = require('../controllers/adminUserManagementController')
const { jwtAdminMiddleware } = require('../middlewares/adminMiddleware')

router.get('/', jwtAdminMiddleware, getAllUsersController );
router.put('/:id', jwtAdminMiddleware, toggleUserAccessController );

module.exports = router;