const express = require('express');
const { getContactsData, getContactDataById } = require('../controllers/contactController.js');

const router = express.Router();

router.get('/', getContactsData);
router.get('/:id', getContactDataById);

module.exports = router;