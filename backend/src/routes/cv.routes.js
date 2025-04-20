const express = require('express');
const { saveCV, getUserCVs } = require('../controllers/cv.controller');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();

// // Route to save a CV
// router.post('/', protect, saveCV);

// // Route to get user's CVs
// router.get('/', protect, getUserCVs);


// Route to save a CV
router.post('/', saveCV);

// Route to get user's CVs
router.get('/', getUserCVs);

module.exports = router;