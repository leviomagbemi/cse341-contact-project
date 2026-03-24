const { getContacts, getContact, createNewContact, updateContact, deleteContact }=  require('../dataAccess/contact.js');
const AppError = require('../errors/AppError');

const getContactsCt = async (req, res) => {
  const data = await getContacts();
  res.status(200).json(data);
};

const getContactCt = async (req, res) => {
  const contactId = req.params.id;
  const data = await getContact(contactId);

  if (!data) {
    throw new AppError('Contact not found.', 404);
  }

  res.status(200).json(data);
};

const createNewContactCt = async (req, res) => {
  const document = req.body;
  const data = await createNewContact(document);

  res.status(201).json(data);
};

const updateContactCt = async (req, res) => {
  const contactId = req.params.id;
  const document = req.body;
  const data = await updateContact(contactId, document);

  if (!data) {
    throw new AppError('Contact not found.', 404);
  }

  res.status(200).json(data);
};

const deleteContactCt = async (req, res) => {
  const contactId = req.params.id;
  const data = await deleteContact(contactId);

  if (!data) {
    throw new AppError('Contact not found.', 404);
  }

  res.status(204).send();
};

module.exports = { getContactsCt, getContactCt, createNewContactCt, updateContactCt, deleteContactCt };
