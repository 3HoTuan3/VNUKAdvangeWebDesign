const express = require('express');
const router = express.Router();
const squareController = require('../controllers/squareControllers');

// Route để hiển thị form  												
router.get('/', squareController.showForm);

// Route để tính chu vi và diện tích  												
router.post('/calculate', squareController.calculateSquare);

module.exports = router;