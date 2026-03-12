const express = require('express');
const getContactData = require('../controllers/contactController.js');

const router = express.Router();

router.get('/:id', getContactData);

module.exports = router;