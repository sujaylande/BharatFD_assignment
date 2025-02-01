const express = require('express');
const router = express.Router();
const { addFAQ, getFAQs } = require('../controllers/faqController.js');

router.post('/', addFAQ);
router.get('/', getFAQs);

module.exports = router;
