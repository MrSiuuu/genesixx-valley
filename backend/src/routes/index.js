const express = require('express');
const userRoutes = require('./user.routes');
const cvRoutes = require('./cv.routes');
const coverLetterRoutes = require('./coverLetter.routes');
const payementRoutes = require('./payment.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/cv', cvRoutes);
router.use('/cover-letter', coverLetterRoutes);
router.use('/payment', payementRoutes);

module.exports = router;