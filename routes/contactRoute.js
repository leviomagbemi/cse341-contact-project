const express = require('express');
const { getContactsCt, getContactCt, createNewContactCt, updateContactCt, deleteContactCt } = require('../controllers/contactController.js');
const validateRequest = require('../middleware/validate.js');
const { contactIdRules, createContactRules, updateContactRules } = require('../validators/contactValidator.js');

const router = express.Router();

// #swagger.tags = ['Contacts']
router.get('/', getContactsCt);
// #swagger.tags = ['Contacts']
router.get('/:id', contactIdRules(), validateRequest, getContactCt);
/*  #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Contact object',
      required: true,
      schema: { $ref: '#/definitions/Contact' }
    }
*/
router.post('/', createContactRules(), validateRequest, createNewContactCt);
/*  #swagger.tags = ['Contacts']
    #swagger.summary = 'Update a contact'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated contact object',
      required: true,
      schema: { $ref: '#/definitions/Contact' }
    }
*/
router.put('/:id', contactIdRules(), updateContactRules(), validateRequest, updateContactCt);
// #swagger.tags = ['Contacts']
router.delete('/:id', contactIdRules(), validateRequest, deleteContactCt);

module.exports = router;
