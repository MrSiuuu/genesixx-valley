const express = require('express');
const userRoutes = require('./user.routes');
const cvRoutes = require('./cv.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/cv', cvRoutes);

module.exports = router;