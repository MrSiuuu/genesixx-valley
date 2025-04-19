const { Router } = require('express');
const { getCurrentUser } = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = Router();

router.get('/me', authMiddleware, getCurrentUser);

module.exports = router; 