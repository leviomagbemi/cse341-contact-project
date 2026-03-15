const client = require('../dataAccess/connection.js')
const { getContacts, getContact, createNewContact, updateContact, deleteContact }=  require('../dataAccess/contact.js');

const getContactsCt = async (req, res) => {
  try {
    const data = await getContacts(client);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
}

const getContactCt = async (req, res) => {
  try {
    const contactId = req.params.id;
    const data = await getContact(client, contactId);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
}

const createNewContactCt = async (req, res) => {
  try {
    const document = req.body;
    const data = await createNewContact(client, document);

    res.status(201).json(data.insertedId);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
}

const updateContactCt = async (req, res) => {
  try {
    console.log(req.body);
    const contactId = req.params.id;
    const document = req.body; 
    
    const data = await updateContact(client, contactId, document);

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
}

const deleteContactCt = async (req, res) => {
  const contactId = req.params.id;

  const data = await deleteContact(client, contactId);

  res.status(200).json(data);
}

module.exports = { getContactsCt, getContactCt, createNewContactCt, updateContactCt, deleteContactCt };