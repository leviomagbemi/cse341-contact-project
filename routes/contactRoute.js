const express = require('express');
const { getContactsCt, getContactCt, createNewContactCt, updateContactCt, deleteContactCt } = require('../controllers/contactController.js');

const router = express.Router();

router.get('/', getContactsCt);
router.get('/:id', getContactCt);
router.post('/', createNewContactCt);
router.put('/:id', updateContactCt);
router.delete('/:id', deleteContactCt);

module.exports = router;