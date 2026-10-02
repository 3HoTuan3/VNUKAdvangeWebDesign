const express = require('express');
const router = express.Router();
const controllers = require('../controllers/pageControllers');

router.get('/about', controllers.about);
router.get('/contacts', controllers.contact);

module.exports = router;